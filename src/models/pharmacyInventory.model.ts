import mongoose from "mongoose";

const pharmacyInventorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    drugid: {
      type: String,
      required: true,
      ref: "Drug",
    },
    batchno: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    expirydate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    costprice: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    lastupdated: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", pharmacyInventorySchema);
