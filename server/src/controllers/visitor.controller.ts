import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Visitor from "../models/visitorModel";

export const getAllAttendance = asyncHandler(
    async (req: Request, res: Response) => {
        const attendances = await Visitor.find();

        res.status(200).json(attendances);
    }
);

export const addNewAttendance = asyncHandler(
    async (req: Request, res: Response) => {
        const { firstName, lastName, department, purpose, timeIn } = req.body;

        const newLog = await Visitor.create({
            firstName,
            lastName,
            department,
            purpose,
            timeIn,
        });

        if (newLog) {
            res.status(200).json({ message: "New Visitor is added!" });
        } else {
            res.status(500);
            throw new Error("Server Error!");
        }
    }
);
