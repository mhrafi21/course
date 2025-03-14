import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCoursesQuery } from "@/redux/baseApi";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "React Mastery",
    description: "Learn React from scratch to advanced level.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description: "Master TypeScript for large-scale applications.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Tailwind CSS Deep Dive",
    description: "Build stunning UIs with Tailwind CSS.",
    image: "https://via.placeholder.com/300",
  },
];

export default function CoursePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: Courses, isLoading } = useGetCoursesQuery({ search: query });
  console.log(query);
  return (
    <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading &&
                Array.from({ length: 2 }, (_, index) => index).map((_, index) => (
                  <Card key={index}>
                    <div className="flex items-center space-x-4 min-h-[200px]">
                      <div className="space-y-2 w-full px-4">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Courses?.data?.data?.length > 0 ? (
          Courses?.data?.data?.map((course) => (
            <Card key={course.id} className="shadow-lg rounded-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
}

export function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/courses?q=${search.trim()}`);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="text-xl font-bold">Course Hub</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>
    </nav>
  );
}
