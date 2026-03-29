import mongoose from "mongoose";

const nursingNoteSchema = mongoose.Schema({
  admission_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admission",
    required: true,
  },
  nurse_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  recorded_at: {
    type: Date,
    required: true,
  },
});

export const NursingNote = mongoose.model("NursingNote", nursingNoteSchema);
