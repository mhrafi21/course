import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentServices } from "./payment.services";

const createPayment = catchAsync(async(req,res) => {
    console.log(req.user);
    const result = await paymentServices.createPaymentIntoDB( req.body as { userId: string, courseId: string}) 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment created successfully!',
        data: result,
    })
})

export const paymentControllers = {
    createPayment
}