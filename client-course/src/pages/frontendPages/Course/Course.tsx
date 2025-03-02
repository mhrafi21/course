import { useGetCoursesQuery } from "@/redux/baseApi";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Import Shadcn pagination components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Import Shadcn card components

const Course: React.FC = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Adjust as needed for card layout

  const { data: courses, isLoading, isError } = useGetCoursesQuery({
    page: page,
    limit: itemsPerPage,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading courses.</p>;
  }

  if (!courses || !courses.data) {
    return <p>No courses found.</p>;
  }

  const courseData = courses.data;
  const totalItems = courses.meta.total;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1>Course Page</h1>
        <p>This is the course page.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseData.map((course) => (
          <Card key={course._id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>${course.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{course.description}</p>
              {/* Add more content as needed */}
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination className="mt-4 justify-center">
        <PaginationPrevious onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === page}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
      </Pagination>
    </div>
  );
};

export default Course;