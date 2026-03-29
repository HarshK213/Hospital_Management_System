from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


# ──────────────────────────────────────────
# Request Models
# ──────────────────────────────────────────

class SymptomRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=5,
        max_length=2000,
        description="Natural language message describing symptoms",
        example="I have been having a severe headache, fever of 102°F, and my body is aching all over since yesterday.",
    )
    patient_age: Optional[int] = Field(None, ge=0, le=120, description="Patient age (optional)")
    patient_gender: Optional[str] = Field(None, description="Patient gender (optional)")


# ──────────────────────────────────────────
# Response Models
# ──────────────────────────────────────────

class ExtractedSymptoms(BaseModel):
    symptoms: List[str]
    duration: Optional[str] = None
    severity: Optional[str] = None


class DiseaseInfo(BaseModel):
    name: str
    confidence: str          # high / medium / low
    description: str
    precautions: List[str]
    urgency: str             # emergency / urgent / routine


class DoctorInfo(BaseModel):
    id: str
    name: str
    specialization: str
    qualification: str
    experience_years: int
    hospital: str
    city: str
    phone: str
    email: Optional[str] = None
    available_days: List[str]
    consultation_fee: int
    rating: float


class DiagnosisResponse(BaseModel):
    request_id: str
    timestamp: datetime
    original_message: str
    extracted_symptoms: ExtractedSymptoms
    possible_diseases: List[DiseaseInfo]
    recommended_doctors: List[DoctorInfo]
    general_advice: str
    disclaimer: str = (
        "This is an AI-generated preliminary assessment only. "
        "It does NOT replace professional medical advice, diagnosis, or treatment. "
        "Always consult a qualified healthcare professional."
    )


# ──────────────────────────────────────────
# Doctor DB Model
# ──────────────────────────────────────────

class DoctorCreate(BaseModel):
    name: str
    specialization: str
    qualification: str
    experience_years: int
    hospital: str
    city: str
    phone: str
    email: Optional[str] = None
    available_days: List[str]
    consultation_fee: int
    rating: float = 4.0
    treats_conditions: List[str] = []   # list of disease/condition keywords


class DoctorResponse(DoctorCreate):
    id: str
