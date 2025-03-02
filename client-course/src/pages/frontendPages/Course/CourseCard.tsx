import React from "react";
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
    <Card key={course._id}>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>${course.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{course.description}</p>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
