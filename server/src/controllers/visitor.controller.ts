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

export const removeVisitor = asyncHandler(
    async (req: Request, res: Response) => {
        const { timeOut } = req.body;
        const { visitorId } = req.query;

        const visitor = await Visitor.findById(visitorId);

        if (visitor) {
            visitor.timeOut = timeOut;
            visitor.save();

            res.status(200).json({ message: "Visitor is out!" });
        } else {
            res.status(404);
            throw new Error("Visitor not found!");
        }
    }
);
