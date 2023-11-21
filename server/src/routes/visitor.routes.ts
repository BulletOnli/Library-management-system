import express from "express";
import {
    addNewVisitor,
    getAllVisitors,
    removeVisitor,
} from "../controllers/visitor.controller";

const router = express.Router();

router.get("/list", getAllVisitors);
router.post("/add", addNewVisitor);
router.put("/update", removeVisitor);

export default router;
