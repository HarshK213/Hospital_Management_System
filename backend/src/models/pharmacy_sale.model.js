import mongoose from "mongoose";

const pharmacySaleSchema = mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    sale_date: {
      type: Date,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PharmacySale = mongoose.model("PharmacySale", pharmacySaleSchema);
