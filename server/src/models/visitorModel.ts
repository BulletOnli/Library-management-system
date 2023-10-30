import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    visitorFName: {
        type: String,
        required: true,
    },
    visitorLName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    timeIn: {
        type: String,
        required: true,
    },
    timeOut: {
        type: Date,
    },
});

export type attendanceType = mongoose.InferSchemaType<typeof attendanceSchema>;

export default mongoose.model<attendanceType>("Visitor", attendanceSchema);
