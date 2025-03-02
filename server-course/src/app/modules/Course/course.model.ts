import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        unique: true, // required: true, // Uncomment when adding required field. Unique title for each course.
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending" // required: true, // Uncomment when adding required field. Instructor approval is mandatory.
    },
    studentEnrolled: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, { timestamps: true })

const Course = mongoose.model<ICourse>("Course", courseSchema)

export default Course;