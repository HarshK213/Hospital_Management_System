import json
import anthropic
from typing import Dict, Any
from app.core.config import settings


SYSTEM_PROMPT = """You are MediAssist, a medical AI assistant specialized in analyzing patient symptoms.
Your job is to:
1. Extract symptoms from the patient's natural language message
2. Predict possible diseases based on those symptoms
3. Provide general health advice

IMPORTANT RULES:
- Always respond with valid JSON only — no markdown, no preamble.
- Be medically accurate but conservative.
- Always include a disclaimer about seeking professional help.
- Do not diagnose definitively; use terms like "possible", "may indicate".
- Identify urgency level correctly: use "emergency" only for life-threatening symptoms.

Respond strictly in this JSON format:
{
  "extracted_symptoms": {
    "symptoms": ["symptom1", "symptom2"],
    "duration": "e.g. 2 days or null",
    "severity": "mild | moderate | severe | null"
  },
  "possible_diseases": [
    {
      "name": "Disease Name",
      "confidence": "high | medium | low",
      "description": "Brief description of the disease",
      "precautions": ["precaution1", "precaution2"],
      "urgency": "emergency | urgent | routine",
      "specialist_needed": "General Physician | Cardiologist | etc."
    }
  ],
  "general_advice": "General health advice string",
  "primary_specialist": "The single most relevant specialist type needed"
}
"""


async def analyze_symptoms(
    message: str,
    patient_age: int | None = None,
    patient_gender: str | None = None,
) -> Dict[str, Any]:
    """
    Send patient message to Claude and get structured medical analysis.
    """
    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    # Build user context
    context_parts = [f'Patient message: "{message}"']
    if patient_age:
        context_parts.append(f"Patient age: {patient_age}")
    if patient_gender:
        context_parts.append(f"Patient gender: {patient_gender}")
    user_content = "\n".join(context_parts)

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_content}],
    )

    raw_text = response.content[0].text.strip()

    # Strip markdown fences if present
    if raw_text.startswith("```"):
        raw_text = raw_text.split("```")[1]
        if raw_text.startswith("json"):
            raw_text = raw_text[4:]
    raw_text = raw_text.strip()

    return json.loads(raw_text)
