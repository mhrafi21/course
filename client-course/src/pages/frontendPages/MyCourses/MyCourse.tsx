import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetCourseBySlugQuery,
  useGetLectureByIdQuery,
} from "@/redux/baseApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ILectureProps } from "@/interface";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const MyCourse = () => {
  const { slug, lectureId } = useParams<{ slug: string; lectureId?: string }>();
  const navigate = useNavigate();
  const { data: enrolledCourse } = useGetCourseBySlugQuery(slug);
  const {
    data: lectureData,
    isLoading,
    isFetching,
  } = useGetLectureByIdQuery(lectureId, {
    skip: !lectureId,
  });
  const [selectedLecture, setSelectedLecture] = useState<ILectureProps | null>(
    null
  );

  useEffect(() => {
    if (lectureData?.data) {
      setSelectedLecture(lectureData.data);
    }
  }, [lectureData]);

  const lectures = enrolledCourse?.data?.lectures || [];
  const currentIndex = lectures.findIndex(
    (lec: ILectureProps) => lec?._id === selectedLecture?._id
  );

  const previousLecture = lectures[currentIndex - 1] || null;
  const nextLecture = lectures[currentIndex + 1] || null;

  const handleNavigate = (lectureId: string) => {
    navigate(`/my-course/${slug}/lecture/${lectureId}`);
  };

  return (
    <div className="container">
      <div className="grid border grid-cols-1 lg:grid-cols-4">
        <Card className="lg:col-span-1 border-r border-t-0 border-l-0 shadow-none rounded-none h-screen overflow-hidden lg:order-1 order-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center border-b py-3">
              <span>Running Lectures</span>
              <span>{enrolledCourse?.data?.lectures.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">Select Lecture</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {lectures.map((lecture: ILectureProps, index: number) => (
                  <DropdownMenuItem key={index} onClick={() => handleNavigate(lecture._id as string)}>
                    {lecture.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ScrollArea className="h-[calc(100vh-120px)] mt-2">
              <ul className="space-y-2">
                {lectures.map((lecture: ILectureProps, index: number) => (
                  <Link key={index} to={`/my-course/${slug}/lecture/${lecture?._id}`}>
                    <li
                      className={`p-3 border-b cursor-pointer transition flex justify-between items-center ${
                        selectedLecture?._id === lecture._id ? "bg-zinc-200" : ""
                      }`}
                    >
                      {lecture.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
        <div className="lg:col-span-3 lg:order-2 order-1">
          {isLoading ? (
            <div className="h-screen flex justify-center items-center">
              <Skeleton className="w-full" />
            </div>
          ) : selectedLecture ? (
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle>{selectedLecture.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {isFetching ? <Skeleton /> : (
                  <div className="relative w-full overflow-hidden">
                    <div className="relative w-full pt-[56.25%]">
                      <iframe
                        src={`${selectedLecture.videoUrl}`}
                        title={selectedLecture.title}
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardContent className="flex gap-4 py-4 border-t">
                <Button disabled={!previousLecture} onClick={() => previousLecture && handleNavigate(previousLecture._id)}>Previous</Button>
                <Button disabled={!nextLecture} onClick={() => nextLecture && handleNavigate(nextLecture._id)}>Next</Button>
              </CardContent>
              <CardContent>
                <CardDescription>{selectedLecture?.description}</CardDescription>
              </CardContent>
            </Card>
          ) : (
            <p className="text-gray-500 text-center">Select a lecture to start learning.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
