import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  {
    supplier_name: {
      type: String,
      required: true,
    },
    contact_email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Supplier = mongoose.model("Supplier", supplierSchema);
