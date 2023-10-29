import express from "express";
import { getAllAttendance } from "../controllers/visitor.controller";

const router = express.Router();

router.get("/", getAllAttendance);

export default router;
