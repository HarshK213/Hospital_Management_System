import mongoose from "mongoose";

const pharmacySaleItem = mongoose.Schema(
  {
    sale_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PharmacySale",
      required: true,
    },
    medicine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PharmacySaleItem = mongoose.model(
  "PharmacySaleItem",
  pharmacySaleItemSchema
);
