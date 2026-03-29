import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Staff } from "../models/staff.model.js";

const generateAccessandRefreshTokens = async (userId) => {
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

    if(!(staffID || password)){
        throw new ApiError(400, "UserId and Password is Required");
    }

    const staff = await Staff.findOne({staffID})

    if(!staff)throw new ApiError(400, "Staff not exist");

    const isPasswordCorrect = await staff.isPasswordCorrect(password);

    if(!isPasswordCorrect)throw new ApiError(400, "Password Incorrect");

    const {accessToken, refreshToken } = await generateAccessandRefreshTokens(staff._id);

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

export {
    StaffLogin
}