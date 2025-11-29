import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 100,
    },
    passwordhash: {
      type: String,
      required: true,
      maxLength: 255,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxLength: 45,
    },
    phone: {
      type: String,
      trim: true,
      maxLength: 20,
    },
    active: {
      type: Boolean,
      default: true,
    },
    lastlogin: {
      type: Date,
    },
    profilepicture: {
      type: String,
      trim: true,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
