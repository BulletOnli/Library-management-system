import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
        },
        studentCourseAndYear: {
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
