import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Example skills & subjects (you can fetch from DB later)
  const skillsList = ["Python", "Java", "SQL", "React", "Data Analysis"];
  const subjectsList = ["Mathematics", "Physics", "Computer Science", "Biology", "Economics"];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSelectedSkills((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSelectedSubjects((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Collect form data
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      educationLevel: e.target.educationLevel.value,
      gpa: e.target.gpa.value,
      skills: selectedSkills,
      subjects: selectedSubjects,
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(result.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
        <div>
          <Link
            to="/login"
            className="px-5 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition duration-300"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Registration Form Section */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500">
            Fill in your details to get personalized career recommendations
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Education Level
              </label>
              <select
                name="educationLevel"
                className="mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your education level</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            {/* GPA */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GPA
              </label>
              <input
                type="number"
                name="gpa"
                step="0.01"
                placeholder="Enter your GPA"
                className="mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Skills Multi-Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {skillsList.map((skill) => (
                  <label
                    key={skill}
                    className={`px-4 py-2 border rounded-lg cursor-pointer ${
                      selectedSkills.includes(skill)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={skill}
                      checked={selectedSkills.includes(skill)}
                      onChange={handleSkillChange}
                      className="hidden"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            {/* Subjects Multi-Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subjects
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {subjectsList.map((subject) => (
                  <label
                    key={subject}
                    className={`px-4 py-2 border rounded-lg cursor-pointer ${
                      selectedSubjects.includes(subject)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={subject}
                      checked={selectedSubjects.includes(subject)}
                      onChange={handleSubjectChange}
                      className="hidden"
                    />
                    {subject}
                  </label>
                ))}
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
