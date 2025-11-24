import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userid: {
      type: String,
      required: true,
      ref: "User",
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    specialty: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    departmentid: {
      type: String,
      required: true,
      ref: "Department",
    },
    licenseno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 45,
    },
    consultationfee: {
      type: Number,
      required: true,
    },
    contact: {
      type: String,
      trim: true,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", doctorSchema);
