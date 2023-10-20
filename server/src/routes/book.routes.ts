import express from "express";
import {
    addBook,
    exportBooksData,
    getAllBooks,
    removeBook,
    updateBook,
} from "../controllers/book.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/list", getAllBooks);
router.post("/add", protectRoute, addBook);
router.put("/update", protectRoute, updateBook);
router.delete("/remove", protectRoute, removeBook);

router.get("/export", exportBooksData);

export default router;
