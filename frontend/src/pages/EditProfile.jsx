import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate(); // ✅ Added for redirect

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    educationLevel: "B.Tech Computer Science",
    gpa: "8.5",
    skills: ["JavaScript", "React"],
    subjects: ["Data Structures", "DBMS"],
  });

  const allSkills = ["JavaScript", "Python", "React", "SQL", "C++", "Machine Learning"];
  const allSubjects = ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "AI"];

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e, field) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setProfile({ ...profile, [field]: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    // 🔗 TODO: API call to save updates

    // Redirect to dashboard after saving
    navigate("/dashboard");
  };

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
          </div>
      </nav>

      {/* Edit Profile Form */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Edit Your <span className="text-indigo-600">Profile</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Education Level</label>
              <input
                type="text"
                name="educationLevel"
                value={profile.educationLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* GPA */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">GPA</label>
              <input
                type="text"
                name="gpa"
                value={profile.gpa}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Skills</label>
              <select
                multiple
                value={profile.skills}
                onChange={(e) => handleMultiSelect(e, "skills")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 h-32"
              >
                {allSkills.map((skill, i) => (
                  <option key={i} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subjects</label>
              <select
                multiple
                value={profile.subjects}
                onChange={(e) => handleMultiSelect(e, "subjects")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 h-32"
              >
                {allSubjects.map((subject, i) => (
                  <option key={i} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
