import { useState } from "react";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";

const CourseDetails = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const course = {
    title: "Full-Stack Web Development with MERN",
    image: "https://source.unsplash.com/800x400/?coding",
    instructor: "Mahdi Hasan Rafi",
    rating: 4.8,
    description:
      "Master the MERN stack and become a full-stack web developer. Learn React, Node.js, Express, and MongoDB with hands-on projects.",
    curriculum: [
      { title: "Introduction to MERN", content: "Overview of the MERN stack and setup." },
      { title: "Frontend with React", content: "Building UI components with React and Tailwind CSS." },
      { title: "Backend with Node.js", content: "Creating APIs with Express and MongoDB." },
      { title: "Authentication & Deployment", content: "JWT authentication and deploying apps." },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Course Hero Section */}
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full rounded-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-2 text-lg">By {course.instructor}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-yellow-400 ${i < course.rating ? '' : 'opacity-50'}`} />
            ))}
            <span className="ml-2">({course.rating})</span>
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">Enroll Now</button>
        </div>
      </div>

      {/* Course Description */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Course Description</h2>
        <p className="mt-2 text-gray-700">{course.description}</p>
      </div>

      {/* Course Curriculum */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Course Curriculum</h2>
        <div className="mt-2">
          {course.curriculum.map((section, index) => (
            <div key={index} className="mt-4 border-b">
              <button
                className="flex justify-between w-full text-left text-lg font-medium py-2"
                onClick={() => toggleSection(index)}
              >
                {section.title}
                {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openSection === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="p-2 text-gray-700"
                >
                  {section.content}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
