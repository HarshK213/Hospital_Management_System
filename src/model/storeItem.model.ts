import mongoose from "mongoose";

const storeItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 100,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    reorderlevel: {
      type: Number,
      required: true,
    },
    currentqty: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", storeItemSchema);
