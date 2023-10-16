import express from "express";
import {
    addBook,
    getAllBooks,
    removeBook,
    updateBook,
} from "../controllers/book.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/lists", getAllBooks);
router.post("/add", protectRoute, addBook);
router.put("/update", protectRoute, updateBook);
router.delete("/remove", protectRoute, removeBook);

export default router;
