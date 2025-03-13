import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IEnrolment } from "./enrollment.interface";
import { Enrollment } from "./enrollment.model";
import Course from "../Course/course.model";

const enrollUserIntoDB = async (payload: IEnrolment) => {
    const { userId, courseId, paymentId } = payload;

    // logic here
    if (!paymentId || !userId || !courseId) {
        throw new AppError(httpStatus.NOT_FOUND, "Missing required fields!")
    }
    // checks if enrolment already exists 
    const existingEnrolment = await Enrollment.findOne({ courseId, userId });
    if (existingEnrolment) {
        throw new AppError(httpStatus.CONFLICT, "Enrolment already exists!")
    }
    // Create enrolment record 
    const result = await Enrollment.create({ userId, courseId, paymentId });
    await Course.findByIdAndUpdate(courseId, { $push: { studentEnrolled: courseId } });
    return result;

}
const getUserEnrollmentsIntoDB = async (payload: string) => {
    const result = await Enrollment.find({ userId: payload }).populate("courseId").populate("userId", "username email role").exec();
    return result;
}

export const enrollmentsServices = {
    enrollUserIntoDB,
    getUserEnrollmentsIntoDB
}

