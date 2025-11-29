import mongoose from "mongoose";

const labResultSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    laborderid: {
      type: String,
      required: true,
      ref: "LabOrder",
    },
    testcode: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
    },
    result: {
      type: String,
      required: true,
      trim: true,
    },
    resultedby: {
      type: String,
      required: true,
      ref: "User",
    },
    resultedat: {
      type: Date,
      required: true,
    },
    attachment: {
      type: String,
      trim: true,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", labResultSchema);
