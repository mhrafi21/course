import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
    title: string;
    description: string;
    price: number;
    slug: string;
    instructor: mongoose.Types.ObjectId;
    studentEnrolled?: mongoose.Types.ObjectId[];
    status: "pending" | "approved"
}