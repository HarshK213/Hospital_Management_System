import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Staff } from "../models/staff.model.js";
import {Patient} from "../models/patient.model.js";
import bcrypt from "bcrypt";

const generateStaffAccessandRefreshTokens = async (userId) => {
  try {
    const staff = await Staff.findById(userId);
    // console.log(staff);
    const accessToken = staff.generateAccessToken();
    const refreshToken = staff.generateRefreshToken();
    // console.log("after refresh token")

    staff.refreshToken = refreshToken;
    await staff.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const StaffLogin = asyncHandler(async(req ,res ) => {
    const {staffID, password} = req.body;

    console.log(req.body)

    if(!staffID || !password){
        throw new ApiError(400, "UserId and Password is Required");
    }

    const staff = await Staff.findOne({user_id : staffID})

    if(!staff)throw new ApiError(400, "Staff not exist");

    const isPasswordCorrect = await staff.isPasswordCorrect(password);

    if(isPasswordCorrect)throw new ApiError(400, "Password Incorrect");

    const {accessToken, refreshToken } = await generateStaffAccessandRefreshTokens(staff._id);

    const loggedInStaff = await Staff.findOne(staff._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true,
    };

    return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    user : loggedInStaff,
                    accessToken,
                    refreshToken
                },
                "Staff Logged in Successfully"
            )
        )
})

const generatePatientAccessandRefreshTokens = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    const accessToken = patient.generateAccessToken();
    const refreshToken = patient.generateRefreshToken();

    patient.refreshToken = refreshToken;
    await patient.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
  }
};

const loginPatient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are Required");
  }

  const user = await Patient.findOne({ email: email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  // console.log(isPasswordCorrect)

  if (isPasswordCorrect) {
    throw new ApiError(400, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generatePatientAccessandRefreshTokens(user._id);

  const loggedInUser = await Patient.findById(user._id).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "User Logged in Successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.user._id);
  const patient = await Patient.findById(req.user._id);

  if (!staff && !patient) {
    throw new ApiError(404, "User not logged in.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user:staff || patient,
      },
      "Current User get Successfully"
    )
  );
})
    
const logout = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  // Identify if the user is a Staff or a Patient
  let user = await Staff.findById(userId);
  let isStaff = true;

  if (!user) {
    user = await Patient.findById(userId);
    isStaff = false;
  }

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Clear the refreshToken for the identified user type
  const Model = isStaff ? Staff : Patient;
  await Model.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  );

  const options = {
    httpOnly: true,
    secure: true
  };

  // Clear cookies and return success response
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
})

export {
    StaffLogin,
    loginPatient,
    getCurrentUser,
    logout
}