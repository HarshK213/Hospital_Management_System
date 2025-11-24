import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    visitid: {
      type: String,
      required: true,
      ref: "Visit",
    },
    authoruserid: {
      type: String,
      required: true,
      ref: "User",
    },
    entrytype: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["progress-note", "diagnosis", "treatment-plan", "vital-signs"],
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: {
      type: String,
      trim: true,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", medicalRecordSchema);
