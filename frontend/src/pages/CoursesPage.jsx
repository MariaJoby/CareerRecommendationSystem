import React from "react";
import { useParams, Link } from "react-router-dom";

export default function CoursesPage() {
  const { id } = useParams(); // careerId from URL

  // Example mock data (replace with DB/API later)
  const courseData = {
    1: [
      {
        title: "Full-Stack Web Development",
        provider: "Coursera",
        duration: "6 months",
        link: "https://www.coursera.org/specializations/full-stack",
      },
      {
        title: "Data Structures & Algorithms in Python",
        provider: "Udemy",
        duration: "40 hours",
        link: "https://www.udemy.com/course/python-for-data-structures-algorithms/",
      },
    ],
    2: [
      {
        title: "Applied Data Science with Python",
        provider: "Coursera",
        duration: "5 months",
        link: "https://www.coursera.org/specializations/data-science-python",
      },
      {
        title: "Machine Learning A-Z",
        provider: "Udemy",
        duration: "45 hours",
        link: "https://www.udemy.com/course/machinelearning/",
      },
    ],
    3: [
      {
        title: "User Experience Design Fundamentals",
        provider: "LinkedIn Learning",
        duration: "10 hours",
        link: "https://www.linkedin.com/learning/topics/user-experience",
      },
      {
        title: "UI/UX Design Specialization",
        provider: "Coursera",
        duration: "4 months",
        link: "https://www.coursera.org/specializations/ui-ux-design",
      },
    ],
  };

  const courses = courseData[id] || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
        <div className="space-x-4">
          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-md bg-gray-200 font-medium hover:bg-gray-300 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition duration-300"
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* Courses Section */}
      <main className="flex-grow px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Recommended <span className="text-indigo-600">Courses</span>
        </h2>

        {courses.length > 0 ? (
          <div className="grid gap-8 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-indigo-700">
                  {course.title}
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium">Provider:</span> {course.provider}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Duration:</span> {course.duration}
                </p>
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                  View Course
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No courses available for this career yet.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
