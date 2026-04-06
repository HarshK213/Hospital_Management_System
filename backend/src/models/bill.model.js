import mongoose from "mongoose";

const billSchema = mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointment_id: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "Appointment",
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["consultation", "procedure", "laboratory", "pharmacy", "radiology", "emergency", "other"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Bill = mongoose.model("Bill", billSchema);
