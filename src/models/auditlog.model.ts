import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    actoruserid: {
      type: String,
      required: true,
      ref: "User",
    },
    action: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    objecttype: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    objectid: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", auditLogSchema);
