import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Book, { BookType } from "../models/bookModel";

export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await Book.find().select("_id");

    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: {
        next?: {
            page: number;
            limit: number;
        };
        prev?: {
            page: number;
            limit: number;
        };
        results?: BookType[];
        totalPage?: number;
    } = {};

    if (endIndex < books.length) {
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

    results.results = await Book.find().limit(limit).skip(startIndex);
    results.totalPage = Math.ceil(books.length / limit);

    res.status(200).json(results);
});

export const addBook = asyncHandler(async (req: Request, res: Response) => {
    const { title, author, publisher, category } = req.body;

    const newBook = await Book.create({
        title,
        author,
        publisher,
        category,
    });

    if (newBook) {
        res.status(200).json({ message: "Added a book" });
    } else {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
    const { bookId } = req.query;
    const { title, author, publisher, category } = req.body;

    const book = await Book.findById(bookId);

    if (book) {
        if (title) book.title = title;
        if (author) book.author = author;
        if (publisher) book.publisher = publisher;
        if (category) book.category = category;

        res.status(200).json({ message: "Book Updated" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

export const removeBook = asyncHandler(async (req: Request, res: Response) => {
    const { bookId } = req.query;

    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: "Deleted a book" });
});
