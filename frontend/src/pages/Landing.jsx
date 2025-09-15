import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-md bg-gray-200 font-medium hover:bg-gray-300 transition duration-300"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row flex-grow items-center justify-center px-8 py-12">
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Discover Your <span className="text-indigo-600">Perfect Career</span> Path
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            Get personalized career recommendations based on your skills,
            interests, and academic profile. Start your journey today and unlock
            your true potential.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/register"
              className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
            alt="Career Team Illustration"
            className="w-80 md:w-[420px] drop-shadow-xl"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
