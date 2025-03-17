import { Document, Schema } from "mongoose"
export interface ILecture extends Document {
    title: string;
    videoUrl: string;
    duration: number;
    description: string;
    courseId: Schema.Types.ObjectId;
}