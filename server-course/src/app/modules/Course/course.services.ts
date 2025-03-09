import { ICourse } from "./course.interface";
import Course from "./course.model";

const createCourseIntoDB = async (payload: ICourse) => {
    // logic here
    const result = await Course.create(payload);
    return result;
}


const getCoursesFromDB = async (payload:
    { page: string, limit: string, search: string, status: string }
) => {

    // logic here
    const { page, limit, search,status } = payload;

    const pageNum = Number(page) || 1;
    const limitPage = Number(limit) || 10;
    const skip = (pageNum - 1) * limitPage;
    const totalData = await Course.find({}).countDocuments();

    const query: { title?: { $regex: string, $options: string }, status?: string, } = {};
  
    if (search) {
        query.title = {$regex: search, $options: "i"};
        query.status = "approved";
        const data = await Course.find(query).populate("instructor", "username").skip(skip).limit(limitPage);
        return { totalData, data };
    } else if(status){
        query.status = status;
        const data = await Course.find(query).populate("instructor", "username").skip(skip).limit(limitPage);
        return { totalData, data };
    }else{
        const data = await Course.find({}).populate("instructor", "username").skip(skip).limit(limitPage);
        return { totalData, data };
    }
}



const getCourseByInstructorIdFromDB = async (instructorId: string) => {
    // logic here
    const result = await Course.find({ instructor: instructorId });
    return result;
}

const getCourseByStudentIdFromDB = async (studentId: string) => {
    // logic here
    const result = await Course.find({ studentEnrolled: studentId }).populate('instructor', "username");
    return result;
}

const approvedCourseInDB = async (courseId: string) => {
    const course = await Course.findById(courseId, { status: 'approved' });
    return course;
}

const getCourseByIdFromDB = async (slug: string) => {
    // logic here
    const result = await Course.findOne({ slug });
    return result;
}

const updateCourseInDB = async (id: string, payload: ICourse) => {
    // logic here
    const result = await Course.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deleteCourseFromDB = async (id: string) => {
    // logic here
    const result = await Course.findByIdAndDelete(id);
    return result;
}

export const courseServices = {
    createCourseIntoDB,
    getCoursesFromDB,
    getCourseByIdFromDB,
    updateCourseInDB,
    deleteCourseFromDB,
    getCourseByInstructorIdFromDB,
    getCourseByStudentIdFromDB,
    approvedCourseInDB

}