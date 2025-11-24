import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    invoiceid: {
      type: String,
      required: true,
      ref: "Invoice",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitprice: {
      type: Number,
      required: true,
    },
    totalprice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", invoiceItemSchema);
