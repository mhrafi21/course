import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IEnrolment } from "./enrollment.interface";
import { Enrollment } from "./enrollment.model";

const enrollUserIntoDB = async (payload: IEnrolment) => {
    const { userId, courseId, paymentId, } = payload;

    // logic here
    if (!paymentId || !userId || !courseId) {
        throw new AppError(httpStatus.NOT_FOUND, "Missing required fields!")
    }

    // checks if enrolment already exists 

    const existingEnrolment = await Enrollment.findOne({ userId, courseId });

    if (existingEnrolment) {
        throw new AppError(httpStatus.CONFLICT, "Enrolment already exists!")
    }

    // Create enrolment record 
    const result = await Enrollment.create({ userId, courseId, paymentId });
    return result;
}

const getUserEnrollmentsIntoDB = async (payload: { userId: string }) => {
    const result = await Enrollment.find({ userId: payload.userId }).populate("courseId");
    return result;
}

export const enrollmentsServices = {
    enrollUserIntoDB,
    getUserEnrollmentsIntoDB
}