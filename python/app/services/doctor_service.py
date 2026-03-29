from typing import List, Dict, Any
from bson import ObjectId
from app.core.database import get_db
from app.models.schemas import DoctorInfo

# Mapping: specialist type (from AI) → MongoDB specialization field values
SPECIALIST_MAP = {
    "general physician": ["General Physician", "General Practice", "Internal Medicine"],
    "cardiologist": ["Cardiologist", "Cardiology"],
    "neurologist": ["Neurologist", "Neurology"],
    "dermatologist": ["Dermatologist", "Dermatology"],
    "gastroenterologist": ["Gastroenterologist", "Gastroenterology"],
    "pulmonologist": ["Pulmonologist", "Pulmonology", "Respiratory Medicine"],
    "orthopedic": ["Orthopedic", "Orthopedics", "Orthopedic Surgeon"],
    "psychiatrist": ["Psychiatrist", "Psychiatry", "Mental Health"],
    "endocrinologist": ["Endocrinologist", "Endocrinology"],
    "urologist": ["Urologist", "Urology"],
    "ophthalmologist": ["Ophthalmologist", "Ophthalmology", "Eye Specialist"],
    "ent specialist": ["ENT Specialist", "Otolaryngologist", "ENT"],
    "gynecologist": ["Gynecologist", "Obstetrics", "OB-GYN"],
    "pediatrician": ["Pediatrician", "Pediatrics"],
    "oncologist": ["Oncologist", "Oncology"],
    "nephrologist": ["Nephrologist", "Nephrology"],
    "rheumatologist": ["Rheumatologist", "Rheumatology"],
    "infectious disease": ["Infectious Disease Specialist", "Infectious Disease"],
}


def _normalize_specialist(specialist_str: str) -> List[str]:
    """Return list of possible specialization strings for a given specialist label."""
    key = specialist_str.lower().strip()
    for map_key, values in SPECIALIST_MAP.items():
        if map_key in key or key in map_key:
            return values
    # Fallback: just use as-is + General Physician
    return [specialist_str, "General Physician"]


def _doc_to_doctor_info(doc: Dict[str, Any]) -> DoctorInfo:
    return DoctorInfo(
        id=str(doc["_id"]),
        name=doc.get("name", ""),
        specialization=doc.get("specialization", ""),
        qualification=doc.get("qualification", ""),
        experience_years=doc.get("experience_years", 0),
        hospital=doc.get("hospital", ""),
        city=doc.get("city", ""),
        phone=doc.get("phone", ""),
        email=doc.get("email"),
        available_days=doc.get("available_days", []),
        consultation_fee=doc.get("consultation_fee", 0),
        rating=doc.get("rating", 4.0),
    )


async def get_recommended_doctors(
    primary_specialist: str,
    possible_diseases: List[Dict[str, Any]],
    limit: int = 5,
) -> List[DoctorInfo]:
    """
    Query MongoDB for doctors matching the required specialization.
    Falls back to General Physician if no specialist found.
    """
    db = get_db()
    if db is None:
        return []

    specializations = _normalize_specialist(primary_specialist)

    # Also collect specialist types from all predicted diseases
    for disease in possible_diseases:
        extra = disease.get("specialist_needed", "")
        if extra:
            specializations.extend(_normalize_specialist(extra))

    # Deduplicate while preserving order
    seen = set()
    unique_specs = []
    for s in specializations:
        if s not in seen:
            seen.add(s)
            unique_specs.append(s)

    # Build case-insensitive query
    import re
    regex_list = [re.compile(f"^{re.escape(s)}$", re.IGNORECASE) for s in unique_specs]

    doctors_cursor = (
        db["doctors"]
        .find({"specialization": {"$in": regex_list}})
        .sort("rating", -1)
        .limit(limit)
    )
    doctors = await doctors_cursor.to_list(length=limit)

    # Fallback to General Physician if empty
    if not doctors:
        fallback_cursor = (
            db["doctors"]
            .find({"specialization": re.compile("general physician", re.IGNORECASE)})
            .sort("rating", -1)
            .limit(limit)
        )
        doctors = await fallback_cursor.to_list(length=limit)

    return [_doc_to_doctor_info(doc) for doc in doctors]


async def add_doctor(doctor_data: Dict[str, Any]) -> str:
    """Insert a doctor document and return its ID."""
    db = get_db()
    result = await db["doctors"].insert_one(doctor_data)
    return str(result.inserted_id)


async def get_all_doctors(limit: int = 50) -> List[DoctorInfo]:
    db = get_db()
    cursor = db["doctors"].find({}).sort("rating", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    return [_doc_to_doctor_info(d) for d in docs]
