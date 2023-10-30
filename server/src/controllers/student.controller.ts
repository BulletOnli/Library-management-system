import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Student, { StudentType } from "../models/studentModel";
import { json2csv } from "json-2-csv";
import fs from "fs";
import QRCode from "qrcode";

export const getAllStudents = asyncHandler(
    async (req: Request, res: Response) => {
        const students = await Student.find();

        res.status(200).json(students);
    }
);

export const paginatedStudentsList = asyncHandler(
    async (req: Request, res: Response) => {
        const students = await Student.find();

        const limit = parseInt(req.query.limit as string);
        const page = parseInt(req.query.page as string);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results: {
            next?: {
                page: Number;
                limit: Number;
            };
            prev?: {
                page: Number;
                limit: Number;
            };
            totalPage?: Number;
            results?: StudentType[];
        } = {};

        if (endIndex < students.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit,
            };
        }

        results.results = await Student.find().limit(limit).skip(startIndex);
        results.totalPage = Math.ceil(students.length / limit);

        res.status(200).json(results);
    }
);

export const addStudent = asyncHandler(async (req: Request, res: Response) => {
    const { studentFName, studentLName, studentCourse } = req.body;

    const newStudent = await Student.create({
        studentFName,
        studentLName,
        studentCourse,
    });

    const qrDetails = {
        studentFName: newStudent.studentFName,
        studentLName: newStudent.studentLName,
        studentCourse: newStudent.studentCourse,
        _id: newStudent._id,
    };

    QRCode.toDataURL(JSON.stringify(qrDetails), (err, url) => {
        newStudent.studentQR = url;
        newStudent.save();

        if (err) {
            res.status(500);
            throw new Error("An Error occured on the server");
        }
    });

    if (newStudent) {
        res.status(200).json({ message: "New student created!" });
    } else {
        res.status(500).json({ message: "An Error occured on our server" });
    }
});

export const updateStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const { studentFName, studentLName, studentCourse } = req.body;
        const { studentId } = req.query;

        const student = await Student.findById(studentId).select([
            "studentName",
            "studentCourse",
            "studentQR",
        ]);

        if (student) {
            const _id = student._id;

            QRCode.toDataURL(
                JSON.stringify({
                    studentFName,
                    studentLName,
                    studentCourse,
                    _id,
                }),
                (err, url) => {
                    if (studentFName) student.studentFName = studentFName;
                    if (studentLName) student.studentLName = studentLName;
                    if (studentCourse) student.studentCourse = studentCourse;

                    student.studentQR = url;
                    student.save();

                    if (err) {
                        res.status(500);
                        throw new Error("An Error occured on the server");
                    }
                }
            );

            res.status(200).json({ message: "Student details updated!" });
        } else {
            res.status(404).json({ message: "Student not found!" });
        }
    }
);

export const removeStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const { studentId } = req.query;

        const deleted = await Student.findByIdAndDelete(studentId);

        if (deleted) {
            res.status(200).json({ message: "Student deleted!" });
        } else {
            res.status(404).json({ message: "Student not found!" });
        }
    }
);

export const exportStudentsData = asyncHandler(
    async (req: Request, res: Response) => {
        const studentsData = await Student.find();
        const csv = await json2csv(studentsData, {
            keys: [
                "_id",
                "studentFName",
                "studentLName",
                "studentCourse",
                "studentQR",
                "createdAt",
            ],
        });

        const filename = `./src/students_data.csv`;
        fs.writeFileSync(filename, csv);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );

        res.download(filename, () => {
            fs.unlinkSync(filename);
        });
    }
);
