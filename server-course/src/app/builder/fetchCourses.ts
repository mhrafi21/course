import Course from '../modules/Course/course.model';
// 🔹 Fetches data with pagination & sorting
export const fetchCourses = async (
  query: Record<string, any>,
  sortQuery: Record<string, any>,
  skip: number,
  limit: number,
) => {
  const totalData = await Course.countDocuments(query);
  const data = await Course.find(query)
    .populate('instructor', 'username')
    .populate("lectures", "title description")
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .exec();

  return { totalData, data };
};
