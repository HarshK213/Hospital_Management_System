import mongoose from "mongoose";

const admissionSchema = mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    bed_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed",
      required: true,
    },
    admission_date: {
      type: Date,
      required: true,
    },
    discharge_date: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["admitted", "discharged"],
      default: "admitted",
    },
  },
  {
    timestamps: true,
  }
);

export const Admission = mongoose.model("Admission", admissionSchema);
