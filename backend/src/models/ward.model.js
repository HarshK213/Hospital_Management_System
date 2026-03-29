import mongoose from "mongoose";

const wardSchema = mongoose.Schema({
  ward_no: {
    type: Number,
    required: true,
    unique: true,
  },
  nurse_assigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse",
    required: true,
  },
});

export const Ward = mongoose.model("Ward", wardSchema);
