// import jwt from "jsonwebtoken";
// import { User } from "@/models/user.model.js";
// import { asyncHandler } from "@/lib/asyncHnadler.js";
// import ApiError from "@/lib/ApiError.js";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//     try {
//         const token =
//             req.cookies?.accessToken ||
//             req.header("Authorization")?.replace("Bearer ", "");
//         if (!token) {
//             throw new ApiError(401, "Unauthorized Access - No token provided");
//         }

//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//         const user = await User.findById(decodedToken?.id).select("-password");

//         if (!user) {
//             throw new ApiError(401, "Invalid Access Token - User not found");
//         }

//         console.log(`${user.role} role is verified`);

//         req.user = user;
//         next();
//     } catch (error) {
//         throw new ApiError(
//             401,
//             error?.message || "Unauthorized Access - Invalid token"
//         );
//     }
// });

import jwt from "jsonwebtoken";
import { User } from "@/models/user.model.js";
import { asyncHandler } from "@/lib/asyncHnadler.js";
import ApiError from "@/lib/ApiError.js";
import { Request, Response, NextFunction } from "express";

interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized Access - No token provided");
        }

        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new ApiError(500, "ACCESS_TOKEN_SECRET is not defined");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as DecodedToken;

        const user = await User.findById(decodedToken?.id).select("-password") as IUser | null;

        if (!user) {
            throw new ApiError(401, "Invalid Access Token - User not found");
        }

        console.log(`${user.role} role is verified`);

        req.user = user;
        next();
    } catch (error: any) {
        throw new ApiError(
            401,
            error?.message || "Unauthorized Access - Invalid token"
        );
    }
});