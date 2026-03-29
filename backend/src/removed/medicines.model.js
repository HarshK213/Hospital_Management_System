import mongoose from "mongoose";

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock_quantity: {
    type: Number,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
});

export const Medicine = mongoose.model("Medicine", medicineSchema);
