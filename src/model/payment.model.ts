import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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
    paidamount: {
      type: Number,
      required: true,
    },
    paidat: {
      type: Date,
      required: true,
    },
    paymentmethod: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["cash", "card", "insurance", "bank-transfer"],
    },
    reference: {
      type: String,
      trim: true,
      maxLength: 255,
    },
    receivedby: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", paymentSchema);
