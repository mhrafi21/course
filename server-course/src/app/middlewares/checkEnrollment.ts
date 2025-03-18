import { Request, Response, NextFunction } from "express";
import Course from "../modules/Course/course.model";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

export const checkEnrollment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.user; // Assuming user ID is stored in req.user after authentication
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, "Not found course")
    }
    if (!course.studentEnrolled || !course.studentEnrolled.includes(id)) {
        throw new AppError(httpStatus.FORBIDDEN, "User is not enrolled in this course");
    }

    next();

})
