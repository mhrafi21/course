import mongoose, { Schema } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    lesson: {
      type: Number,
      required: true,
    },
    category_slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    duration: {
      type: String,
    },
    lectures: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lecture',
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending', // required: true, // Uncomment when adding required field. Instructor approval is mandatory.
    },
    studentEnrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
