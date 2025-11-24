import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mrn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 45,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      maxLength: 10,
      enum: ["male", "female", "other"],
    },
    phone: {
      type: String,
      trim: true,
      maxLength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxLength: 100,
    },
    address: {
      type: String,
      trim: true,
    },
    identifiers: {
      type: String,
      trim: true,
    },
    primaryinsurance: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", patientSchema);
