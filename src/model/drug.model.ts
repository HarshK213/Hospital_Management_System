import mongoose from "mongoose";

const drugSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    genericname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    brand: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    form: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
    },
    strength: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    defaultunitprice: {
      type: Number,
      required: true,
    },
    atccode: {
      type: String,
      trim: true,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", drugSchema);
