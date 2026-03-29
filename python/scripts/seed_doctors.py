"""
Seed script — populates MongoDB with sample doctors.
Run once: python scripts/seed_doctors.py
"""
import asyncio
import motor.motor_asyncio

MONGODB_URL = "mongodb+srv://HarshK:Harsh123@cluster0.nmujbad.mongodb.net"
DATABASE_NAME = "medicare"

SAMPLE_DOCTORS = [
    {
        "name": "Dr. Priya Sharma",
        "specialization": "General Physician",
        "qualification": "MBBS, MD (Internal Medicine)",
        "experience_years": 12,
        "hospital": "City Health Clinic",
        "city": "Mumbai",
        "phone": "+91-9876543210",
        "email": "priya.sharma@cityhealth.in",
        "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "consultation_fee": 500,
        "rating": 4.8,
        "treats_conditions": ["fever", "cold", "flu", "infection", "hypertension"],
    },
    {
        "name": "Dr. Rajesh Kumar",
        "specialization": "Cardiologist",
        "qualification": "MBBS, MD, DM (Cardiology)",
        "experience_years": 18,
        "hospital": "Heart Care Institute",
        "city": "Delhi",
        "phone": "+91-9988776655",
        "email": "rajesh.kumar@heartcare.in",
        "available_days": ["Monday", "Wednesday", "Friday", "Saturday"],
        "consultation_fee": 1200,
        "rating": 4.9,
        "treats_conditions": ["chest pain", "heart disease", "hypertension", "arrhythmia"],
    },
    {
        "name": "Dr. Ananya Mehta",
        "specialization": "Neurologist",
        "qualification": "MBBS, MD, DM (Neurology)",
        "experience_years": 14,
        "hospital": "NeuroLife Hospital",
        "city": "Bangalore",
        "phone": "+91-9765432109",
        "email": "ananya.mehta@neurolife.in",
        "available_days": ["Tuesday", "Thursday", "Saturday"],
        "consultation_fee": 1100,
        "rating": 4.7,
        "treats_conditions": ["headache", "migraine", "seizure", "stroke", "dizziness"],
    },
    {
        "name": "Dr. Suresh Patel",
        "specialization": "Gastroenterologist",
        "qualification": "MBBS, MD, DM (Gastroenterology)",
        "experience_years": 16,
        "hospital": "Digestive Health Centre",
        "city": "Ahmedabad",
        "phone": "+91-9654321098",
        "email": "suresh.patel@digestive.in",
        "available_days": ["Monday", "Tuesday", "Thursday", "Friday"],
        "consultation_fee": 900,
        "rating": 4.6,
        "treats_conditions": ["stomach pain", "diarrhea", "vomiting", "IBS", "acid reflux"],
    },
    {
        "name": "Dr. Meena Rao",
        "specialization": "Dermatologist",
        "qualification": "MBBS, MD (Dermatology)",
        "experience_years": 10,
        "hospital": "SkinCare Clinic",
        "city": "Hyderabad",
        "phone": "+91-9543210987",
        "email": "meena.rao@skincare.in",
        "available_days": ["Monday", "Wednesday", "Friday"],
        "consultation_fee": 700,
        "rating": 4.5,
        "treats_conditions": ["rash", "acne", "eczema", "psoriasis", "allergy", "itching"],
    },
    {
        "name": "Dr. Vikram Singh",
        "specialization": "Pulmonologist",
        "qualification": "MBBS, MD (Respiratory Medicine)",
        "experience_years": 13,
        "hospital": "Breath Easy Hospital",
        "city": "Chennai",
        "phone": "+91-9432109876",
        "email": "vikram.singh@breatheasy.in",
        "available_days": ["Tuesday", "Wednesday", "Thursday", "Saturday"],
        "consultation_fee": 950,
        "rating": 4.7,
        "treats_conditions": ["cough", "breathlessness", "asthma", "pneumonia", "TB"],
    },
    {
        "name": "Dr. Kavitha Nair",
        "specialization": "Endocrinologist",
        "qualification": "MBBS, MD, DM (Endocrinology)",
        "experience_years": 15,
        "hospital": "Hormone Health Clinic",
        "city": "Pune",
        "phone": "+91-9321098765",
        "email": "kavitha.nair@hormonehealth.in",
        "available_days": ["Monday", "Thursday", "Saturday"],
        "consultation_fee": 1050,
        "rating": 4.8,
        "treats_conditions": ["diabetes", "thyroid", "hormonal imbalance", "obesity"],
    },
    {
        "name": "Dr. Arjun Verma",
        "specialization": "Orthopedic",
        "qualification": "MBBS, MS (Orthopedics)",
        "experience_years": 11,
        "hospital": "BoneCare Hospital",
        "city": "Jaipur",
        "phone": "+91-9210987654",
        "email": "arjun.verma@bonecare.in",
        "available_days": ["Monday", "Tuesday", "Wednesday", "Friday"],
        "consultation_fee": 800,
        "rating": 4.5,
        "treats_conditions": ["joint pain", "back pain", "fracture", "arthritis", "knee pain"],
    },
    {
        "name": "Dr. Sunita Joshi",
        "specialization": "ENT Specialist",
        "qualification": "MBBS, MS (ENT)",
        "experience_years": 9,
        "hospital": "Hearing & ENT Clinic",
        "city": "Kolkata",
        "phone": "+91-9109876543",
        "email": "sunita.joshi@entclinic.in",
        "available_days": ["Tuesday", "Thursday", "Friday", "Saturday"],
        "consultation_fee": 650,
        "rating": 4.6,
        "treats_conditions": ["ear pain", "sore throat", "nasal congestion", "tonsillitis", "sinusitis"],
    },
    {
        "name": "Dr. Rohit Gupta",
        "specialization": "Psychiatrist",
        "qualification": "MBBS, MD (Psychiatry)",
        "experience_years": 17,
        "hospital": "MindWell Clinic",
        "city": "Delhi",
        "phone": "+91-9098765432",
        "email": "rohit.gupta@mindwell.in",
        "available_days": ["Monday", "Wednesday", "Thursday", "Saturday"],
        "consultation_fee": 1000,
        "rating": 4.9,
        "treats_conditions": ["anxiety", "depression", "insomnia", "stress", "panic attacks"],
    },
    {
        "name": "Dr. Pooja Iyer",
        "specialization": "General Physician",
        "qualification": "MBBS, PGDM",
        "experience_years": 7,
        "hospital": "QuickCare Clinic",
        "city": "Bhopal",
        "phone": "+91-8987654321",
        "email": "pooja.iyer@quickcare.in",
        "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "consultation_fee": 400,
        "rating": 4.4,
        "treats_conditions": ["fever", "cold", "cough", "infection", "weakness", "fatigue"],
    },
    {
        "name": "Dr. Manoj Tiwari",
        "specialization": "Infectious Disease Specialist",
        "qualification": "MBBS, MD (Infectious Disease)",
        "experience_years": 20,
        "hospital": "Infection Control Hospital",
        "city": "Mumbai",
        "phone": "+91-8876543210",
        "email": "manoj.tiwari@infectioncontrol.in",
        "available_days": ["Monday", "Wednesday", "Friday"],
        "consultation_fee": 1300,
        "rating": 4.9,
        "treats_conditions": ["malaria", "dengue", "typhoid", "viral fever", "TB", "COVID"],
    },
]


async def seed():
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    collection = db["doctors"]

    # Drop existing and re-insert
    await collection.drop()
    result = await collection.insert_many(SAMPLE_DOCTORS)
    print(f"✅ Seeded {len(result.inserted_ids)} doctors into '{DATABASE_NAME}.doctors'")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
