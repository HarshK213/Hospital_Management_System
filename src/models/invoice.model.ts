import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
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
    invoicenumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 100,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
      enum: ["draft", "issued", "paid", "overdue", "cancelled"],
    },
    duedate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", invoiceSchema);
