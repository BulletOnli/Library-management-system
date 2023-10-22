import express from "express";
import {
    exportStudentsData,
    getAllStudents,
    paginatedStudentsList,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/list", getAllStudents);
router.get("/list/paginated", paginatedStudentsList);

router.get("/export", exportStudentsData);

export default router;
