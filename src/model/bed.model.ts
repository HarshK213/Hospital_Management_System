import mongoose from "mongoose";

const bedSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ward: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    bednumber: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    bedtype: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["general", "icu", "private", "semi-private"],
    },
    isoccupied: {
      type: Boolean,
      default: false,
    },
    currentadmissionid: {
      type: String,
      ref: "Admission",
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", bedSchema);
