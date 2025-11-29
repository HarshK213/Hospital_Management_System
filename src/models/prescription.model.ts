import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
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
    prescribedby: {
      type: String,
      required: true,
      ref: "User",
    },
    prescribedat: {
      type: Date,
      required: true,
    },
    items: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["active", "completed", "cancelled"],
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

export const Visit = mongoose.model("Visit", prescriptionSchema);
