import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router";
import { useAuth } from "@/hooks/useAuth"; // Custom hook to check authentication
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Clock, ShoppingCart } from "lucide-react";
import { ICourse } from "@/interface";

const CourseDetails = ({ course, isLoading }: { course?: ICourse; isLoading: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // Check if user is logged in
  const [isRedirecting, setIsRedirecting] = useState<true | false>(false);


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
      navigate(`/checkout/`); // Proceed to checkout
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-16 py-10 flex flex-col lg:flex-row gap-8">
      {/* Left - Course Details */}
      <div className="flex-1">
        {isLoading ? (
          <Skeleton className="w-full h-80 rounded-xl" />
        ) : (
          <img src={course?.thumbnail} alt={course?.title} className="w-full h-80 object-cover rounded-xl shadow-lg" />
        )}

        <h1 className="text-3xl font-bold mt-6">
          {isLoading ? <Skeleton className="w-2/3 h-8" /> : course?.title}
        </h1>

        <p className="text-gray-600 text-lg mt-2">
          {isLoading ? <Skeleton className="w-full h-6" /> : course?.description}
        </p>

        <p className="text-gray-700 mt-6 text-lg">
          <strong>Instructor:</strong> {isLoading ? <Skeleton className="w-32 h-6 inline-block" /> : course?.instructor}
        </p>
      </div>

      {/* Right - Buy Now Section */}
      <Card className="w-full lg:w-96 h-fit p-5 sticky top-20 shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-3">
            {isLoading ? <Skeleton className="w-16 h-6" /> : `$${course?.price.toFixed(2)}`}
          </h2>

          <Button
            onClick={handleBuyNow}
            disabled={isLoading || isRedirecting}
            className="w-full py-2 text-lg flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {isRedirecting ? "Redirecting..." : "Buy Now"}
          </Button>

          <div className="mt-6 space-y-3 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              {isLoading ? <Skeleton className="w-40 h-6" /> : <span>{course?.studentsEnrolled} Students Enrolled</span>}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              {isLoading ? <Skeleton className="w-28 h-6" /> : <span>Duration: {course?.duration}</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
