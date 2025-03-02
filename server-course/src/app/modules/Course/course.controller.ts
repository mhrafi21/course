import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.services";
import { ICourse } from "./course.interface";

 const createCourse = catchAsync(async(req,res) => {
    const { title, description,price } = req.body;
    const result = await courseServices.createCourseIntoDB({title, description,price, instructor: req.user.id} as ICourse);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Course successfully created!",
        data: result
    })
});

const getCourses = catchAsync(async(req,res) => {
    const result = await courseServices.getCoursesFromDB();
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All courses retrieved successfully!",
        data: result
    })
})

const getCourseById = catchAsync(async(req,res) => {
    const result = await courseServices.getCourseByIdFromDB(req.params.id);
    
    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "Course not found!"
            ,
            data:null
        })
    }
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course retrieved successfully!",
        data: result
    })
})

const getCourseByInstructorId = catchAsync(async(req,res)=>{
    const {id} = req.user;
    const result = await courseServices.getCourseByInstructorIdFromDB(id as string);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses retrieved successfully!",
        data: result
    })
})

const getCourseByStudentId = catchAsync(async(req,res) => {
    const {id} = req.user;
    const result = await courseServices.getCourseByStudentIdFromDB(id as string);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses retrieved successfully!",
        data: result
    })
})

const approvedCourse = catchAsync(async(req,res) => {
    const result = await courseServices.approvedCourseInDB(req.params.id);
    
    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "Course not found!"
            ,
            data:null
        })
    }
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course approved successfully!",
        data: result
    })
})



const updateCourseById = catchAsync(async(req,res) => {
    const { title, description } = req.body;
    const result = await courseServices.updateCourseInDB(req.params.id, {title, description} as ICourse);
    
    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "Course not found!"
            ,
            data:null
        })
    }
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course updated successfully!",
        data: result
    })
})

const deleteCourseById = catchAsync(async(req,res) => {
    const result = await courseServices.deleteCourseFromDB(req.params.id);
    
    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "Course not found!"
            ,
            data:null
        })
    }
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course deleted successfully!",
        data: result
    })
})


export const courseControllers = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    getCourseByInstructorId,
    getCourseByStudentId,
    approvedCourse
}

