import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Visitor from "../models/visitorModel";

export const getAllVisitors = asyncHandler(
    async (req: Request, res: Response) => {
        const attendances = await Visitor.find().lean();

        res.status(200).json(attendances);
    }
);

export const addNewVisitor = asyncHandler(
    async (req: Request, res: Response) => {
        const { studentFName, studentLName, department, timeIn } = req.body;

        const newLog = await Visitor.create({
            visitorFName: studentFName,
            visitorLName: studentLName,
            department,
            timeIn,
            timeOut: "",
        });

        if (newLog) {
            res.status(200).json({ message: "New Visitor is added!" });
        } else {
            res.status(500);
            throw new Error("Server Error!");
        }
    }
);
