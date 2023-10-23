import express from "express";
import {
    addStudent,
    removeStudent,
    exportStudentsData,
    getAllStudents,
    paginatedStudentsList,
    updateStudent,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/list", getAllStudents);
router.get("/list/paginated", paginatedStudentsList);
router.post("/add", addStudent);
router.put("/update", updateStudent);
router.delete("/remove", removeStudent);

router.get("/export", exportStudentsData);

export default router;
