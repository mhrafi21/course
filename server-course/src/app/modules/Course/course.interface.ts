import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
    title: string;
    category: string;
    category_slug: string;
    description: string;
    price: number;
    discountPrice: number;
    duration?: string;
    thumbnail: string;
    language: string;
    lesson: number;
    slug?: string;
    instructor: mongoose.Types.ObjectId;
    studentEnrolled?: mongoose.Types.ObjectId[];
    status: "pending" | "approved"
}