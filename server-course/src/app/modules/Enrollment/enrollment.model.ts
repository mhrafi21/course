import mongoose, { Schema } from 'mongoose';
import { IEnrolment } from './enrollment.interface';

const EnrollmentSchema = new Schema<IEnrolment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  paymentId: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now },
  totalLectures: { type: Number},
  completedLectures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lecture',
    },
  ],
  progress: { type: Number, default: 0 }, // Percentage of course completion
},
  {
    timestamps: true,
  }
);

export const Enrollment = mongoose.model<IEnrolment>(
  'Enrollment',
  EnrollmentSchema,
);
