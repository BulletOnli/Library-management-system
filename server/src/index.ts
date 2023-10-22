import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import studentRoutes from "./routes/student.routes";

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json("Hello World");
});

// Routes
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/students", studentRoutes);

// Error Handler
app.use(errorHandler);

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log("Mongodb Connected"));

app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});
