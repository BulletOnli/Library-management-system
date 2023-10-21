import express from "express";
import {
    addBook,
    exportBooksData,
    getAllBooks,
    paginateBooks,
    removeBook,
    updateBook,
} from "../controllers/book.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/list", getAllBooks);
router.get("/list/paginated", paginateBooks);
router.post("/add", addBook); // Must be protected
router.put("/update", updateBook); // Must be protected
router.delete("/remove", removeBook); // Must be protected

router.get("/export", exportBooksData);

export default router;
