import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const LectureSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  lecture_slug:{type: String, unique: true, required: true},
  videoUrl: { type: String, required: true }, // Video link (YouTube, Vimeo, etc.)
  description: { type: String },
  duration: { type: Number, required: true }, // Duration in minutes
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
});


//  checking before lecture creates unique title and lecture_slug

LectureSchema.pre("save", async function (next) {

  if (this.isModified("title") || this.isModified("lecture_slug")) {
    const existingLecture = await Lecture.findOne({
      $or: [{ title: this.title }, { lecture_slug: this.lecture_slug }],
    });

    if (existingLecture) {
      next(new AppError(httpStatus.CONFLICT, "Title or Lecture Slug already exists"));
    }
  }

  next();
});

export const Lecture = mongoose.model("Lecture", LectureSchema);
