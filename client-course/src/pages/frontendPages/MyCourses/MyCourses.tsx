import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useGetEnrollCourseQuery } from "@/redux/baseApi";
import { Link, useNavigate } from "react-router";

const MyCourses = () => {
    const navigate = useNavigate();
    const {data: enrolledCourses} = useGetEnrollCourseQuery(undefined);
    // console.log(enrolledCourses?.data);

    const handleCourseLecture = (course_slug: string) => {

        navigate(`/course/lecture/${course_slug}`);

    }

  return (
    <div className="flex justify-center items-center">
      <div className="container">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="text-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Congratulations! 🎉</h2>
          <p className="text-gray-600 text-lg">You have successfully enrolled in the following courses:</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses?.data?.map((course: any, index: number) => (
            <Card key={index} className=" shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold ">{course?.courseId?.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                  <CardTitle className=" text-sm font-medium">Your progress:</CardTitle>
                  <Progress value={course?.progress} className="h-2  rounded-full" />
                  <CardDescription className="text-sm text-gray-500 mt-1">{course?.progress}% completed</CardDescription>
                </div>
                <motion.div>
                    <Link to={`//`}>
                  <Button  size="lg" className="w-full  text-white">
                    <PlayCircle className="mr-2" /> Continue Learning
                  </Button>
                    </Link>
                </motion.div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-6">
          <p className="hover:underline cursor-pointer">Join the community</p>
          <p className="hover:underline cursor-pointer">Download resources</p>
          <p className="hover:underline cursor-pointer">Set reminders</p>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;