import mongoose from "mongoose";

const labTestSchema = mongoose.Schema({
  test_name: {
    type: String,
    required: true,
  },
  test_cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const LabTest = mongoose.model("LabTest", labTestSchema);
