import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
    title: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    studentEnrolled?: mongoose.Types.ObjectId[];
}