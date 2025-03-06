import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Stripe from "stripe";
import Course from "../Course/course.model";
import config from "../../config";

const stripe = new Stripe(config.stripe_secret_key as string,{apiVersion: "2025-02-24.acacia"} )

const createPaymentIntoDB = async(payload: {userId: string, courseId: string}) => {
    const {userId, courseId} = payload;

    // check if course exists 
    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND,'Course not found');
    }

    // create payment intent 

    const paymentIntent = await stripe.paymentIntents.create({
        amount: course.price * 100, // amount in cents
        currency: 'usd',
        metadata: {
            userId,
            courseId,
        },
        description: `Payment for course ${course.title}`,
    })

    return {clientSecret:paymentIntent.client_secret}

}

export const paymentServices = {
    createPaymentIntoDB,
}