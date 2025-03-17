import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ILecture } from "./lecture.interface";
import { lectureServices } from "./lecture.services";
import { generateSlug } from "../../utils/generateSlug";

const addLecture = catchAsync(async(req,res) => {
    const {title} = req.body;
    const lecture_slug = generateSlug(title as string);
    // Add lecture logic here
    const result = await lectureServices.addLectureIntoDB({ lecture_slug , ...req.body} as ILecture);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Lecture added successfully",
        data: result,
    })
})

const getLectureById = catchAsync(async(req,res)=>{
    const result = await lectureServices.getLectureByIdFromDB(req.params.lecture_slug as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Lecture retrieved successfully",
        data: result,
    })
})

export const lectureControllers = {
    addLecture,
    getLectureById
}