import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetCourseBySlugQuery,
  useGetLectureByIdQuery,
} from "@/redux/baseApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ILectureProps } from "@/interface";
const MyCourse = () => {
  const { slug, lectureId } = useParams<{ slug: string; lectureId?: string }>();
  const navigate = useNavigate();
  const { data: enrolledCourse } = useGetCourseBySlugQuery(slug);
  const { data: lectureData, isLoading } = useGetLectureByIdQuery(lectureId, {
    skip: !lectureId,
  });
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    if (lectureData?.data) {
      setSelectedLecture(lectureData.data);
    }
  }, [lectureData]);

  // find current Lecture index
  const lectures = enrolledCourse?.data?.lectures || [];
  const currentIndex = lectures.findIndex(
    (lec: ILectureProps) => lec?._id === selectedLecture?._id
  );

  
  const previousLecture = lectures[currentIndex - 1] || null;

  const nextLecture = lectures[currentIndex + 1] || null;
  console.log(previousLecture, nextLecture);

  const handleNavigate = (lectureId: string) => {
    navigate(`/my-course/${slug}/${lectureId}`);
  };

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Lecture List */}
        <Card className="lg:col-span-1 h-screen overflow-hidden lg:order-1 order-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center border-b py-3">
              {" "}
              <span>Running Lectures</span>{" "}
              <span>{enrolledCourse?.data?.lectures.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-120px)]">
              <ul className="space-y-2">
                {enrolledCourse?.data?.lectures.map(
                  (lecture: ILectureProps, index: number) => (
                    <Link
                      key={index}
                      to={`/my-course/${slug}/${lecture._id}`}
                    >
                      <li
                        className={`p-3 border rounded-lg cursor-pointer transition  flex justify-between mb-2 items-center ${
                          selectedLecture?._id === lecture._id
                            ? "bg-zinc-200"
                            : ""
                        }`}
                      >
                        {lecture.title}
                      </li>
                    </Link>
                  )
                )}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content - Video Player */}
        <div className="lg:col-span-3 lg:order-2 order-1">
          {isLoading ? (
            <div className="h-screen flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : enrolledCourse?.error ? (
            <div className="text-red-500 text-center">
              {enrolledCourse.error.message}
            </div>
          ) : enrolledCourse?.data?.lectures.length === 0 ? (
            <div className="text-gray-500 text-center">
              You haven't enrolled in any course yet.
            </div>
          ) : selectedLecture ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedLecture.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-hidden rounded-lg border">
                  <div className="relative w-full pt-[56.25%]">
                    <iframe
                      src={selectedLecture.videoUrl}
                      title={selectedLecture.title}
                      allowFullScreen
                      content="hello how are you for all"
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </CardContent>
              <CardContent className="flex gap-4 py-4 border-t">
                <div className=" ">
                  <Button
                    disabled={!previousLecture}
                    onClick={() =>
                      previousLecture &&
                      handleNavigate(previousLecture?._id as string)
                    }
                    variant={"outline"}
                  >
                    Previous
                  </Button>
                </div>
                <div className=" ">
                  <Button
                    disabled={!nextLecture}
                    onClick={() =>
                      nextLecture && handleNavigate(nextLecture?._id as string)
                    }
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-gray-500 text-center">
              Select a lecture to start learning.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
