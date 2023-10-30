import express from "express";
import {
    addNewVisitor,
    getAllVisitors,
} from "../controllers/visitor.controller";

const router = express.Router();

router.get("/list", getAllVisitors);
router.post("/add", addNewVisitor);

export default router;
