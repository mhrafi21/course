import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IEnrolment } from './enrollment.interface';
import { Enrollment } from './enrollment.model';
import Course from '../Course/course.model';
import { ObjectId } from 'mongoose';

const enrollUserIntoDB = async (payload: IEnrolment) => {
  const { userId, courseId, paymentId } = payload;

  // logic here
  if (!paymentId || !userId || !courseId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Missing required fields!');
  }
  // checks if enrolment already exists
  const existingEnrolment = await Enrollment.findOne({ courseId, userId });
  if (existingEnrolment) {
    throw new AppError(httpStatus.CONFLICT, 'Enrolment already exists!');
  }

  const lectures = await Course.findById(courseId);
  if (!lectures) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }
  // Create enrolment record
  const result = await Enrollment.create({ userId, courseId, paymentId, totalLectures: lectures?.lectures?.length });

  await Course.findByIdAndUpdate(courseId, {
    $push: { studentEnrolled: courseId },
  });
  return result;
};

const completeLectureIntoDB = async (payload: { courseId: string; lectureId: ObjectId, userId: string; }) => {
  const { courseId, lectureId, userId } = payload;

  const course = await Enrollment
    .findOne({ courseId, userId })

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }


  const existLecture = course.completedLectures?.includes(lectureId);
  if (existLecture) {
    throw new AppError(httpStatus.CONFLICT, 'Lecture already completed!');
  }

  const result = await Enrollment.findByIdAndUpdate(course._id, {
    $push: { completedLectures: lectureId },
    $inc: { progress: ((course?.completedLectures?.length === 0 ? 1 : course?.completedLectures?.length) as number / course.totalLectures!) * 100 },
  }, { new: true });

  return result;

}

const getUserEnrollmentsIntoDB = async (payload: string) => {
  const result = await Enrollment.find({ userId: payload })
    .populate('courseId')
    .populate('userId', 'username email role')
    .exec();
  return result;
};

export const enrollmentsServices = {
  enrollUserIntoDB,
  getUserEnrollmentsIntoDB,
  completeLectureIntoDB
};
