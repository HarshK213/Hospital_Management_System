import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException, status

from app.models.schemas import (
    SymptomRequest,
    DiagnosisResponse,
    ExtractedSymptoms,
    DiseaseInfo,
    DoctorCreate,
    DoctorResponse,
    DoctorInfo,
)
from app.services.ai_service import analyze_symptoms
from app.services.doctor_service import get_recommended_doctors, add_doctor, get_all_doctors

router = APIRouter()


# ──────────────────────────────────────────────────────
# POST /diagnose  — Core endpoint
# ──────────────────────────────────────────────────────

@router.post(
    "/diagnose",
    response_model=DiagnosisResponse,
    summary="Analyze symptoms and get disease prediction + doctor suggestions",
    status_code=status.HTTP_200_OK,
)
async def diagnose(request: SymptomRequest):
    """
    Submit a natural language message describing your symptoms.
    The API will:
    1. Extract symptoms from your message using AI
    2. Predict possible diseases
    3. Suggest relevant doctors from the database
    """
    # Step 1 – AI analysis
    try:
        ai_result = await analyze_symptoms(
            message=request.message,
            patient_age=request.patient_age,
            patient_gender=request.patient_gender,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )

    # Step 2 – Parse AI response
    extracted = ExtractedSymptoms(
        symptoms=ai_result["extracted_symptoms"].get("symptoms", []),
        duration=ai_result["extracted_symptoms"].get("duration"),
        severity=ai_result["extracted_symptoms"].get("severity"),
    )

    diseases = [
        DiseaseInfo(
            name=d["name"],
            confidence=d.get("confidence", "medium"),
            description=d.get("description", ""),
            precautions=d.get("precautions", []),
            urgency=d.get("urgency", "routine"),
        )
        for d in ai_result.get("possible_diseases", [])
    ]

    primary_specialist = ai_result.get("primary_specialist", "General Physician")
    general_advice = ai_result.get("general_advice", "Please consult a doctor.")

    # Step 3 – Fetch doctors from MongoDB
    doctors = await get_recommended_doctors(
        primary_specialist=primary_specialist,
        possible_diseases=ai_result.get("possible_diseases", []),
        limit=5,
    )

    return DiagnosisResponse(
        request_id=str(uuid.uuid4()),
        timestamp=datetime.utcnow(),
        original_message=request.message,
        extracted_symptoms=extracted,
        possible_diseases=diseases,
        recommended_doctors=doctors,
        general_advice=general_advice,
    )


# ──────────────────────────────────────────────────────
# Doctor Management Endpoints
# ──────────────────────────────────────────────────────

@router.post(
    "/doctors",
    summary="Add a new doctor to the database",
    status_code=status.HTTP_201_CREATED,
)
async def create_doctor(doctor: DoctorCreate):
    """Add a new doctor record to MongoDB."""
    try:
        doc_id = await add_doctor(doctor.model_dump())
        return {"message": "Doctor added successfully", "id": doc_id}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to add doctor: {str(e)}",
        )


@router.get(
    "/doctors",
    response_model=list[DoctorInfo],
    summary="List all doctors in the database",
)
async def list_doctors(limit: int = 50):
    """Retrieve all doctors stored in MongoDB."""
    try:
        return await get_all_doctors(limit=limit)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch doctors: {str(e)}",
        )
