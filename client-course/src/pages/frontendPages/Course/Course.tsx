import { useGetCoursesQuery } from "@/redux/baseApi";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import { ICourse } from "@/interface";
import CourseCard from "./CourseCard";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import { CardSkeleton } from "@/components/Skeleton/Skeleton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Course: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get values from URL, defaulting to page 1 & limit 6
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({
    page,
    limit,
  });

  useEffect(() => {
    // Ensure URL stays updated with current page & limit
    setSearchParams({ page: String(page), limit: String(limit) });
  }, [page, limit, setSearchParams]);

  return (
    <div className="container py-4">
      {isError && <p>Error loading courses.</p>}
      {!courses ||
        !courses.data ||
        (courses.data.data.length < 0 && <p>No courses found.</p>)}
      <h1 className="mb-4">Course Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading &&
          Array.from({ length: limit }, (_, index) => index).map((_, index) => (
            <Card key={index}>
              <div className="flex items-center space-x-4 min-h-[135px]">
                <div className="space-y-2 w-full px-4">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </Card>
          ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.data?.data.map((course: ICourse) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      {/* Reusable Pagination Component */}
      <CustomPagination
        currentPage={page}
        totalPages={Math.ceil(courses?.data?.totalData / limit)}
        onPageChange={(newPage) => {
          setSearchParams({ page: String(newPage), limit: String(limit) });
        }}
      />
    </div>
  );
};

export default Course;
