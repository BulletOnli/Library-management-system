import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export type BookType = mongoose.InferSchemaType<typeof bookSchema>;

export default mongoose.model<BookType>("Book", bookSchema);
