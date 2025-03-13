import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth"; // Custom hook to check authentication
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Clock, ShoppingCart } from "lucide-react";
import { ICourse } from "@/interface";
import { useGetEnrollCourseQuery } from "@/redux/baseApi";

const CourseDetails = ({
  course,
  isLoading,
}: {
  course?: ICourse;
  isLoading: boolean;
}) => {
  const { data: enrolledCourseData, isLoading: enrolledCourseLoading } =
    useGetEnrollCourseQuery(undefined);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth(); // Check if user is logged in
  const [isRedirecting, setIsRedirecting] = useState<true | false>(false);
  // console.log(user);
  useEffect(() => {
    if (isRedirecting && isAuthenticated) {
      setIsRedirecting(false);
      navigate(location.pathname); // Return to the course details page
    }
  }, [isAuthenticated, isRedirecting, navigate, location.pathname]);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setIsRedirecting(true);
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`); // Redirect to login with return URL
    } else {
      navigate(`/checkout/?cId=${course?._id}&uId=${user?.id}`); // Proceed to checkout
    }
  };

  if (enrolledCourseLoading) {
    return <p>Loading enrolled course...</p>;
  }

  const alreadyEnrolled = enrolledCourseData?.data?.some((c) =>
    c?.courseId?.studentEnrolled.includes(course?._id)
  );

  return (
    <div className="container mx-auto px-4 lg:px-16 py-10 flex flex-col lg:flex-row gap-8">
      {/* Left - Course Details */}
      {isLoading ? (
        <Skeleton className="w-full h-80 rounded-xl" />
      ) : (
        <div className="flex-1">
          <img
            src={course?.thumbnail}
            alt={course?.title}
            className="w-full h-80 object-cover rounded-xl shadow-lg"
          />

          <h1 className="text-3xl font-bold mt-6">course?.title</h1>

          <p className="text-gray-600 text-lg mt-2">course?.description</p>

          <p className="text-gray-700 mt-6 text-lg">
            <strong>Instructor:</strong> {course?.instructor}
          </p>
        </div>
      )}
      {/* Right - Buy Now Section */}
      <Card className="w-full lg:w-96 h-fit p-5 sticky top-20 shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-3">
            `$${course?.price.toFixed(2)}
          </h2>

          {alreadyEnrolled && alreadyEnrolled ? (
            <Button className="w-full py-2 text-lg flex items-center gap-2 bg-gray-500 hover:bg-gray-500 cursor-not-allowed">
              <ShoppingCart className="w-5 h-5" />
              Already Enrolled
            </Button>
          ) : (
            <Button
              onClick={handleBuyNow}
              disabled={isLoading || isRedirecting}
              className="w-full py-2 text-lg flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {isRedirecting ? "Redirecting..." : "Buy Now"}
            </Button>
          )}

          <div className="mt-6 space-y-3 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <CardDescription>
                {course?.studentEnrolled && course?.studentEnrolled?.length > 0
                  ? course?.studentEnrolled.length
                  : 0}{" "}
                Students Enrolled
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <CardDescription>Duration: {course?.duration}</CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
