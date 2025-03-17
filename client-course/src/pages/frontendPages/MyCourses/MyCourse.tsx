import { useGetCourseBySlugQuery } from "@/redux/baseApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  description: string;
  duration: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  lectures: Lecture[];
}

const MyCourse = () => {
  const { slug } = useParams();
  console.log(slug)
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const {data: enrolledCourse} = useGetCourseBySlugQuery(slug);
  console.log(enrolledCourse);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
//       const data = await response.json();
//       setCourse(data);
//     };
//     fetchCourse();
//   }, [courseId]);



  return (
    <div className="max-w-4xl mx-auto mt-8">
      {course && (
        <>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>

          {/* Lecture List */}
          <h2 className="text-2xl mt-6">Lectures</h2>
          <div className="mt-4">
            {course.lectures.map((lecture) => (
              <div
                key={lecture._id}
                onClick={() => setSelectedLecture(lecture)}
                className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
              >
                <h3 className="text-lg font-semibold">{lecture.title}</h3>
                <p className="text-sm text-gray-500">Duration: {lecture.duration} min</p>
              </div>
            ))}
          </div>

          {/* Selected Lecture */}
          {selectedLecture && (
            <div className="mt-6 p-4 border rounded-lg shadow bg-white">
              <h2 className="text-xl font-bold">{selectedLecture.title}</h2>
              <p className="text-gray-600">{selectedLecture.description}</p>
              <iframe
                className="w-full h-64 mt-4 rounded-lg"
                src={selectedLecture.videoUrl}
                title={selectedLecture.title}
                allowFullScreen
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCourse;
