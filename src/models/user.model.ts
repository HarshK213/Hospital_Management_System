import mongoose, { Document, Schema, Model } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

// Interface for User document
export interface IUser extends Document {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  active: boolean;
  lastlogin?: Date;
  profilepicture?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  isPassCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// Interface for User model (static methods if any)
interface IUserModel extends Model<IUser> {
  // Add static methods here if needed
  // Example: findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, IUserModel>(
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
    password: {
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
    refreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware
userSchema.pre<IUser>("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance methods
userSchema.methods.isPassCorrect = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function(): string {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Fix: You had typo "SCERET" instead of "SECRET" in environment variables

export const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema);