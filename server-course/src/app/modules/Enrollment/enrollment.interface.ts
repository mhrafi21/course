import { Document, Schema } from 'mongoose';


// progress bar update type;

export interface IEnrolment extends Document {
  userId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  paymentId: string;
  enrolledAt?: Date;
  totalLectures?: number;
  completedLectures?: Schema.Types.ObjectId[];
  progress?: number; // percentage of course completion
}