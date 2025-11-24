import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    itemid: {
      type: String,
      required: true,
    },
    itemtype: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["store", "pharmacy"],
    },
    qty: {
      type: Number,
      required: true,
    },
    movementtype: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["in", "out", "adjustment"],
    },
    occurredat: {
      type: Date,
      required: true,
    },
    reference: {
      type: String,
      trim: true,
      maxLength: 255,
    },
    performedby: {
      type: String,
      required: true,
      ref: "User",
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

export const Visit = mongoose.model("Visit", stockMovmentSchema);
