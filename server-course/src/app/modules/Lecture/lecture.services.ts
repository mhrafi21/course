import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Course from "../Course/course.model";
import { ILecture } from "./lecture.interface"
import { Lecture } from "./lecture.model";

const addLectureIntoDB = async(payload: ILecture) => {
    const {
        title,
        lecture_slug,
        videoUrl,
        duration,
        description,
        courseId
    } = payload;

    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND,"Course not found");
    }

    const lecture = new Lecture({
        title,
        lecture_slug,
        videoUrl,
        duration,
        description,
        courseId
    })
    await lecture.save();
    // add lecture in the course;
    course.lectures.push(lecture._id);
    await course.save();
    return lecture;

}

const getLectureByIdFromDB = async(lectureId: string) => {

    const lecture = await Lecture.findById(lectureId)
    // if(!lecture){
    //     throw new AppError(httpStatus.NOT_FOUND,"Lecture not found");
    // }
    return lecture;
}

export const lectureServices = {
    addLectureIntoDB,
    getLectureByIdFromDB
}