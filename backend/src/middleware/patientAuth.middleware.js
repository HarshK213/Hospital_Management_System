import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Patient } from "../models/patient.model.js";

export const verifyPatientJWT = asyncHandler(async(req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Access - No token provided");
    }

    const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const patient = await Patient.findById(decodedtoken._id).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

    if (!patient) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = patient;
    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
