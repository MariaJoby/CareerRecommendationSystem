// src/pages/CareerRecommendations.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CareerRecommendations() {
  // Dummy recommendations (replace later with DB/API data)
  const recommendations = [
    {
      id: 1,
      career: "Software Engineer",
      description: "Design and build scalable software applications.",
      qualification: "B.Tech / B.Sc. in Computer Science",
      matchScore: 92,
    },
    {
      id: 2,
      career: "Data Scientist",
      description:
        "Analyze data to uncover insights and build predictive models.",
      qualification: "Degree in CS, Stats, or related field",
      matchScore: 88,
    },
    {
      id: 3,
      career: "UX Designer",
      description: "Create intuitive and user-friendly product experiences.",
      qualification: "Design or HCI background",
      matchScore: 85,
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
          to="/dashboard"
          className="px-5 py-2 rounded-md bg-gray-200 font-medium hover:bg-gray-300 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </nav>

      {/* Recommendations Section */}
      <main className="flex-grow px-8 py-12">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Recommended Careers
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
                {rec.career}
              </h3>
              <p className="text-gray-700 mb-3">{rec.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-medium">Qualification:</span>{" "}
                {rec.qualification}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Match Score:</span>{" "}
                {rec.matchScore}%
              </p>
              <Link
                to="/learning-resource"
                className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                View Learning Resources
              </Link>
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
