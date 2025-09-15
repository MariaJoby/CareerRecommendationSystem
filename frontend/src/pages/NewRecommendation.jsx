// src/pages/NewRecommendation.jsx
import React from "react";

export default function NewRecommendation() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
      </nav>

      {/* Placeholder Section */}
      <main className="flex flex-col flex-grow items-center justify-center px-8 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Generate New Recommendation
        </h2>
        <p className="text-lg text-gray-600 max-w-xl">
          This page will allow users to generate fresh career recommendations
          based on updated profile data. 🚀
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
