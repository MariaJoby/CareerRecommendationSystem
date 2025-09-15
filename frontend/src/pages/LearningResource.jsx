// src/pages/LearningResource.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LearningResource() {
  // Dummy resources (replace later with DB/API data)
  const resources = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      provider: "Coursera",
      link: "https://www.coursera.org/specializations/full-stack",
    },
    {
      id: 2,
      title: "Data Science with Python",
      provider: "edX",
      link: "https://www.edx.org/course/data-science-python",
    },
    {
      id: 3,
      title: "UX Design Fundamentals",
      provider: "Udemy",
      link: "https://www.udemy.com/course/ux-design-fundamentals/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
        <Link
          to="/career-recommendations"
          className="px-5 py-2 rounded-md bg-gray-200 font-medium hover:bg-gray-300 transition duration-300"
        >
          Back to Recommendations
        </Link>
      </nav>

      {/* Resources Section */}
      <main className="flex-grow px-8 py-12">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Learning Resources
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
                {res.title}
              </h3>
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Provider:</span> {res.provider}
              </p>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Go to Course
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
    