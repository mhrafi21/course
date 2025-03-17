import { Document, Schema } from "mongoose"
export interface ILecture extends Document {
    title: string;
    lecture_slug: string;
    videoUrl: string;
    duration: number;
    description: string;
    courseId: Schema.Types.ObjectId;
}