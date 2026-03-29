import mongoose from "mongoose";

const labReportSchema = mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LabReuest",
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  report_file: {
    type: String,
    required: true,
  },
});

export const LabReport = mongoose.model("LabReport", labReportSchema);
