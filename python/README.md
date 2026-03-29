# 🏥 MediAssist API

AI-powered symptom analysis, disease prediction, and doctor recommendation backend built with **FastAPI**, **MongoDB**, and **Claude AI**.

---

## 📁 Project Structure

```
medical-api/
├── app/
│   ├── main.py                  # FastAPI app entry point
│   ├── core/
│   │   ├── config.py            # Environment settings (Pydantic)
│   │   └── database.py          # MongoDB async connection (Motor)
│   ├── models/
│   │   └── schemas.py           # Request/Response Pydantic models
│   ├── services/
│   │   ├── ai_service.py        # Claude AI: symptom extraction + disease prediction
│   │   └── doctor_service.py    # MongoDB: doctor recommendation logic
│   └── routers/
│       └── diagnosis.py         # FastAPI route handlers
├── scripts/
│   └── seed_doctors.py          # One-time DB seeder (12 sample doctors)
├── requirements.txt
├── .env.example
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone & create virtual environment
```bash
git clone <repo-url>
cd medical-api
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment variables
```bash
cp .env.example .env
# Edit .env and set your ANTHROPIC_API_KEY
```

### 4. Start MongoDB (local)
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Ubuntu/Debian
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 5. Seed the doctor database
```bash
python scripts/seed_doctors.py
# Output: ✅ Seeded 12 doctors into 'mediassist.doctors'
```

### 6. Run the server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open **http://localhost:8000/docs** for interactive Swagger UI.

---

## 🚀 API Endpoints

### `POST /api/v1/diagnose`
Core endpoint — analyze symptoms and get predictions + doctor suggestions.

**Request Body:**
```json
{
  "message": "I have been having a severe headache, fever of 102°F, body aches, and I feel very tired since yesterday evening.",
  "patient_age": 30,
  "patient_gender": "male"
}
```

**Response:**
```json
{
  "request_id": "uuid-...",
  "timestamp": "2025-01-01T10:00:00",
  "original_message": "I have been having...",
  "extracted_symptoms": {
    "symptoms": ["severe headache", "fever 102°F", "body aches", "fatigue"],
    "duration": "since yesterday evening",
    "severity": "moderate"
  },
  "possible_diseases": [
    {
      "name": "Influenza (Flu)",
      "confidence": "high",
      "description": "A viral respiratory infection causing fever, body aches, and fatigue.",
      "precautions": ["Rest", "Stay hydrated", "Avoid contact with others"],
      "urgency": "routine"
    },
    {
      "name": "Dengue Fever",
      "confidence": "medium",
      "description": "A mosquito-borne viral infection common in tropical regions.",
      "precautions": ["Monitor platelet count", "Stay hydrated", "Seek medical attention"],
      "urgency": "urgent"
    }
  ],
  "recommended_doctors": [
    {
      "id": "mongo-object-id",
      "name": "Dr. Manoj Tiwari",
      "specialization": "Infectious Disease Specialist",
      "qualification": "MBBS, MD (Infectious Disease)",
      "experience_years": 20,
      "hospital": "Infection Control Hospital",
      "city": "Mumbai",
      "phone": "+91-8876543210",
      "available_days": ["Monday", "Wednesday", "Friday"],
      "consultation_fee": 1300,
      "rating": 4.9
    }
  ],
  "general_advice": "Rest well, stay hydrated, and monitor your temperature. Seek immediate care if symptoms worsen.",
  "disclaimer": "This is an AI-generated preliminary assessment only..."
}
```

---

### `POST /api/v1/doctors`
Add a new doctor to the database.

**Request Body:**
```json
{
  "name": "Dr. John Doe",
  "specialization": "General Physician",
  "qualification": "MBBS, MD",
  "experience_years": 10,
  "hospital": "City Hospital",
  "city": "Mumbai",
  "phone": "+91-9000000000",
  "available_days": ["Monday", "Tuesday", "Wednesday"],
  "consultation_fee": 600,
  "rating": 4.5,
  "treats_conditions": ["fever", "cold", "hypertension"]
}
```

---

### `GET /api/v1/doctors`
List all doctors in the database.

```
GET /api/v1/doctors?limit=50
```

---

## 🔄 How It Works

```
User Message (natural language)
        │
        ▼
POST /api/v1/diagnose
        │
        ├──► [1] Claude AI (ai_service.py)
        │         • Extracts symptoms from free-text
        │         • Predicts possible diseases with confidence levels
        │         • Identifies required specialist type
        │         • Returns structured JSON
        │
        ├──► [2] MongoDB Query (doctor_service.py)
        │         • Maps specialist type → specialization field values
        │         • Queries doctors collection
        │         • Sorts by rating (descending)
        │         • Falls back to General Physician if no match
        │
        └──► [3] DiagnosisResponse
                  • Extracted symptoms
                  • Possible diseases + precautions + urgency
                  • Recommended doctors
                  • General advice + disclaimer
```

---

## 🔑 Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MONGODB_URL` | `mongodb://localhost:27017` | MongoDB connection string |
| `DATABASE_NAME` | `mediassist` | Database name |
| `ANTHROPIC_API_KEY` | *(required)* | Claude API key from console.anthropic.com |
| `APP_ENV` | `development` | App environment |
| `DEBUG` | `true` | Enable debug mode |

---

## 📝 Notes

- The AI uses `claude-sonnet-4-20250514` for accuracy and speed.
- MongoDB queries are case-insensitive regex matches on the `specialization` field.
- The system includes 12 pre-seeded doctors covering major specializations.
- All AI responses include a medical disclaimer.
- `patient_age` and `patient_gender` are optional but improve prediction accuracy.
