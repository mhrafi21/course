import { Document, Schema } from "mongoose"

export   interface IEnrolment extends Document {
    userId: Schema.Types.ObjectId;
    courseId: Schema.Types.ObjectId;
    paymentId: string;
    enrolledAt: Date;
    progress: number; // percentage of course completion
}