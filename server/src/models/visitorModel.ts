import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    timeIn: {
        type: String,
        required: true,
    },
    timeOut: {
        type: Date,
        required: true,
    },
});

export type attendanceType = mongoose.InferSchemaType<typeof attendanceSchema>;

export default mongoose.model<attendanceType>("Attendance", attendanceSchema);
