// src/pages/EditProfile.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import supabase from "../supabaseClient"; // ✅ Supabase connection
import Select from "react-select";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    educationLevel: "",
    gpa: "",
    skills: [],
    subjects: [],
  });

  // ✅ Fetch or create profile data from Supabase when user is logged in
  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (user && user.id) {
        let { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") { // ignore "no rows found"
          console.error("Error fetching profile:", error);
          return;
        }

        // Create a profile if none exists
        if (!data) {
          const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .insert([{ id: user.id, name: "", email: user.email }])
            .select()
            .single();

          if (insertError) {
            console.error("Error creating profile:", insertError);
            return;
          }

          data = newProfile;
        }

        setProfile({
          name: data.name || "",
          email: data.email || user.email || "",
          educationLevel: data.education_level || "",
          gpa: data.gpa || "",
          skills: data.skills || [],
          subjects: data.subjects || [],
        });
      }
    };

    fetchOrCreateProfile();
  }, [user]);

  const allSkills = ["JavaScript", "Python", "React", "SQL", "C++", "Machine Learning"];
  const allSubjects = ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "AI"];

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e, field) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setProfile({ ...profile, [field]: options });
  };

  // ✅ Update Supabase profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          education_level: profile.educationLevel,
          gpa: profile.gpa,
          skills: profile.skills,
          subjects: profile.subjects,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Update error:", error);
        alert("Failed to update profile");
      } else {
        setUser({ ...user, ...profile });
        alert("Profile updated successfully!");
        navigate("/dashboard");
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
                disabled
              />
            </div>

            {/* Education Level */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Education Level</label>
          <select
            name="educationLevel"
            value={profile.educationLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
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
  <Select
    isMulti
    name="skills"
    options={allSkills.map((skill) => ({ value: skill, label: skill }))}
    value={profile.skills.map((skill) => ({ value: skill, label: skill }))}
    onChange={(selectedOptions) =>
      setProfile({
        ...profile,
        skills: selectedOptions.map((opt) => opt.value),
      })
    }
    className="basic-multi-select"
    classNamePrefix="select"
  />
</div>
            {/* Subjects */}
<div>
  <label className="block text-gray-700 font-medium mb-2">Subjects</label>
  <Select
    isMulti
    name="subjects"
    options={allSubjects.map((subject) => ({
      value: subject,
      label: subject,
    }))}
    value={profile.subjects.map((subject) => ({
      value: subject,
      label: subject,
    }))}
    onChange={(selectedOptions) =>
      setProfile({
        ...profile,
        subjects: selectedOptions.map((opt) => opt.value),
      })
    }
    className="basic-multi-select"
    classNamePrefix="select"
  />
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
