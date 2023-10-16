import mongoose from "mongoose";

// FOR FACULTY ONLY
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export type UserType = mongoose.InferSchemaType<typeof userSchema>;

export default mongoose.model<UserType>("User", userSchema);
