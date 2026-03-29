import mongoose from "mongoose";

const medicalHistorySchema = mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    medical_record:{
      type: [String],
      required: true,
    },
    lap_report:{
      type: [String],
      required: true,
    },
    admission_history:{
      type: [String],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const MedicalHistory = mongoose.model(
  "MedicalHistory",
  medicalHistorySchema
);
