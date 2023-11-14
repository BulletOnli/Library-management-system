import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getAccessToken } from "../utils/tokens";

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, firstName, lastName, password } = req.body;
        const user = await User.findOne({ email }).select("email").lean();

        if (user) {
            res.status(400);
            throw new Error("Email already used");
        }

        // Validate req.body (register details)
        const signupSchema = z.object({
            email: z.string().email().endsWith(".com"),
            firstName: z
                .string()
                .min(2, "First name must be at least 2 characters"),
            lastName: z
                .string()
                .min(3, "Last name must be at least 3 characters"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters"),
        });
        const validateResults = signupSchema.safeParse(req.body);

        if (!validateResults.success) {
            const error = validateResults.error.errors[0];

            res.status(400);
            throw new Error(
                error.message.replace(/String/g, error.path.toString())
            );
        }

        const newUser = await User.create({
            email,
            firstName,
            lastName,
            password: await bcrypt.hash(password, 12),
        });

        if (newUser) {
            res.status(200).json({
                message: "Registration Success",
                token: getAccessToken(newUser._id.toString()),
            });
        } else {
            res.status(400).json({ message: "Registration failed!" });
        }
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(["password", "_id"]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error("Incorrect email or password!");
    }

    res.status(200).json({
        message: "Login success",
        token: getAccessToken(user._id.toString()),
    });
});
