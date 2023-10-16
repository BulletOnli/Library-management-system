import * as globalTypes from "../types/global";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const protectRoute = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (token) {
            try {
                const decode = jwt.verify(
                    token,
                    process.env.JWT_ACCESS_TOKEN!
                ) as { _id: string };

                req.user = await User.findById(decode._id).select("-password");
                next();
            } catch (error) {
                res.status(401);
                throw new Error("Token expired, Not Authorized");
            }
        } else {
            res.status(401);
            throw new Error("No Token, Not Authorized");
        }
    }
);

export default protectRoute;
