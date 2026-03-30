import mongoose from "mongoose";

const bedSchema = mongoose.Schema({
  ward: {
    type: String,
    required: true,
  },
  bed_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["available", "occupied"],
  },
});

export const Bed = mongoose.model("Bed", bedSchema);
