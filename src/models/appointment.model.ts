import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    patientid: {
      type: String,
      required: true,
      ref: "Patient",
    },
    doctorid: {
      type: String,
      required: true,
      ref: "Doctor",
    },
    departmentid: {
      type: String,
      required: true,
      ref: "Department",
    },
    scheduledstart: {
      type: Date,
      required: true,
    },
    scheduledend: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: [
        "scheduled",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
        "no-show",
      ],
    },
    source: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["walk-in", "online", "phone", "referral"],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", appointmentSchema);
