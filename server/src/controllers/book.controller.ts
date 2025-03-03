import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Book, { BookType } from "../models/bookModel";
import { json2csv } from "json-2-csv";
import fs from "fs";

export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await Book.find().lean();

    res.status(200).json(books);
});

export const getPaginateBooks = asyncHandler(
    async (req: Request, res: Response) => {
        const searchQuery = req.query.search;
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);

        const search = searchQuery
            ? {
                  $or: [
                      { title: { $regex: searchQuery, $options: "i" } },
                      { author: { $regex: searchQuery, $options: "i" } },
                  ],
              }
            : {};

        // Just checking how many books without limit
        const totalBooks = await Book.countDocuments(search);

        res.status(200).json({
            results: await Book.find(search)
                .limit(limit)
                .skip((page - 1) * limit)
                .lean(),
            totalPage: Math.ceil(Math.max(1, totalBooks) / limit),
        });
    }
);

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

        await book.save();
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

export const exportBooksData = asyncHandler(
    async (req: Request, res: Response) => {
        const booksData = await Book.find().lean();
        const csv = await json2csv(booksData, {
            keys: ["title", "author", "publisher", "category"],
        });

        const filename = `./src/books_data_${Date.now()}.csv`;
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
