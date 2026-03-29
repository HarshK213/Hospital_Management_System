import mongoose from "mongoose";

const labRequestSchema = mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LabTest",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  sample_collected_date: {
    type: Date,
    required: true,
  },
  report_date: {
    type: Date,
    required: true,
  },
});

export const LabRequest = mongoose.model("LabRequest", labRequestSchema);
