import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
        <div>
          <Link
            to="/"
            className="px-5 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition duration-300"
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col flex-grow items-center justify-center px-8 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to your <span className="text-indigo-600">Dashboard</span>
        </h2>

        {/* Profile Summary Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl mb-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Profile Summary
          </h3>
          <p className="text-gray-600">
            <span className="font-medium">Name:</span> John Doe
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Education:</span> B.Tech Computer Science
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Skills:</span> Python, React, SQL
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Subjects:</span> Data Structures, AI, DBMS
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-6">
          <Link
            to="/edit-profile"
            className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Edit Profile
          </Link>
          <Link
            to="/career-recommendations"
            className="px-8 py-4 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            View Recommendations
          </Link>
          <Link
            to="/new-recommendation"
            className="px-8 py-4 bg-green-500 text-white text-lg rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Generate New Recommendation
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
