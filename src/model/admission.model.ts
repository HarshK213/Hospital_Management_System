import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
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
      unique: true,
      ref: "Visit",
    },
    bedid: {
      type: String,
      required: true,
      ref: "Bed",
    },
    admittime: {
      type: Date,
      required: true,
    },
    dischargetime: {
      type: Date,
    },
    admittingdoctorid: {
      type: String,
      required: true,
      ref: "Doctor",
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["admitted", "discharged", "transferred"],
    },
    reason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", admissionSchema);
