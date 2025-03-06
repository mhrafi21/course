import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrollmentsServices } from "./enrollment.services";
import { IEnrolment } from "./enrollment.interface";

const enrollMentUser = catchAsync(async(req, res) => {
   
    const result = await enrollmentsServices.enrollUserIntoDB(req.body as IEnrolment);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully enrolled!',
        data: result,
    })
})


export const enrollmentControllers = {
    enrollMentUser
}