import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
    },
    channel: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
      enum: ["email", "sms", "push", "in-app"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isread: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Visit = mongoose.model("Visit", notificationSchema);
