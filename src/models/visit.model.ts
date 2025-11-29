import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
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
    appointmentid: {
      type: String,
      ref: "Appointment",
    },
    visittype: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
      enum: ["outpatient", "inpatient", "emergency", "follow-up"],
    },
    starttime: {
      type: Date,
      required: true,
    },
    endtime: {
      type: Date,
    },
    attendingdoctorid: {
      type: String,
      required: true,
      ref: "Doctor",
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["active", "completed", "cancelled"],
    },
    primarydiagnosis: {
      type: String,
      trim: true,
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

export const Visit = mongoose.model("Visit", visitSchema);
