import mongoose, { Schema } from "mongoose";
import { IEnrolment } from "./enrollment.interface";

const EnrollmentSchema = new Schema<IEnrolment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  paymentId: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 }, // Percentage of course completion
});

export const Enrollment = mongoose.model<IEnrolment>("Enrollment", EnrollmentSchema);
