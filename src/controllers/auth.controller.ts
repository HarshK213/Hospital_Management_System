import React from "react";
import { asyncHandler } from "@/lib/asyncHnadler";
import ApiError from "@/lib/ApiError";
import ApiResponse from "@/lib/ApiResponse";
import { User } from "@/models/user.model";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

import { Request, Response, } from "express";

const generateTokens = (userId : string){
   try{
        const user = await User.findById(userId);
        const accessToken = user?.generateAccessToken();
        const refreshToken = user?.generateRefreshToken();

        user?.refreshToken = refreshToken;
        await user?.save({validateBeforeSave : false});
        
        return {accessToken, refreshToken};
    }catch(error){
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

const registerUser = asyncHandler((req:Request, res:Response)=>{});

const login = asyncHandler((req:Request, res:Response) => {});

const logout = asyncHandler((req:Request, res:Response) => {});

const getCurrUser = asyncHandler((req:Request, res:Response) => {});

export {
    registerUser,
    login,
    logout,
    getCurrUser
};