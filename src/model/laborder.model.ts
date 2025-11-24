import mongoose from "mongoose";

const labOrderSchema = new mongoose.Schema(
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
    orderedby: {
      type: String,
      required: true,
      ref: "User",
    },
    orderedat: {
      type: Date,
      required: true,
    },
    tests: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
      enum: ["routine", "urgent", "stat"],
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["ordered", "collected", "processing", "completed", "cancelled"],
    },
    sampleid: {
      type: String,
      trim: true,
      maxLength: 45,
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
({});

export const Visit = mongoose.model("Visit", labOrderSchema);
