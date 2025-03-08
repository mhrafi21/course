import React from "react";
import { Link } from "react-router";
import { ICourse } from "@/interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Shadcn card components

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/course/${course?.slug}`}>
      <Card key={course?._id}>
        <CardHeader>
          <CardTitle>{course?.title}</CardTitle>
          <CardDescription>${course?.price}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{course?.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
