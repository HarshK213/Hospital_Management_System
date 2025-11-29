import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 255,
    },
    location: {
      type: String,
      trim: true,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", departmentSchema);
