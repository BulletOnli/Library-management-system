import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentFName: {
            type: String,
            required: true,
        },
        studentLName: {
            type: String,
            required: true,
        },
        studentCourse: {
            type: String,
            required: true,
        },
        studentQR: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export type StudentType = mongoose.InferSchemaType<typeof studentSchema>;

export default mongoose.model<StudentType>("Student", studentSchema);
