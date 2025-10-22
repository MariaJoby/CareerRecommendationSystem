import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminAddCareer() {

  const navigate = useNavigate();

  const [career, setCareer] = useState({
    name: "",
    description: "",
    req_qualification: "",
    category: "",
    salary_range: "",
    learning_resources: "",
    skills: [],    // Array of skill_ids
    subjects: [],  // Array of subject_ids
  });

  const [skills, setSkills] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Fetch skills & subjects on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillRes = await fetch("http://localhost:5000/api/careers/skills");
        const subjectRes = await fetch("http://localhost:5000/api/careers/subjects");

        const skillData = await skillRes.json();
        const subjectData = await subjectRes.json();

        setSkills(skillData);
        setSubjects(subjectData);
      } catch (error) {
        console.error("Error fetching skills/subjects:", error);
        alert("Failed to load skills or subjects");
      }
    };
    fetchData();
  }, []);
const toggleSelection = (arr, value) => {
  if (arr.includes(value)) {
    return arr.filter((v) => v !== value);
  } else {
    return [...arr, value];
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !career.name ||
      !career.description ||
      !career.req_qualification ||
      career.skills.length === 0 ||
      career.subjects.length === 0
    ) {
      alert("Please fill all required fields and select skills & subjects");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(career),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Career added successfully!");
        setCareer({
          name: "",
          description: "",
          req_qualification: "",
          category: "",
          salary_range: "",
          learning_resources: "",
          skills: [],
          subjects: [],
        });
      } else {
        alert(result.error || "Failed to add career");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  const handleLogout = () => {
    // Optionally clear tokens if you use them
    // localStorage.removeItem("adminToken");
  
    navigate("/"); // Redirect to home page
  };
    

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Admin
        </h1>
        <button
  onClick={handleLogout}
  className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
>
  Logout
</button>

      </nav>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Add Career
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Career Name */}
            <input
              type="text"
              placeholder="Career Name"
              value={career.name}
              onChange={(e) =>
                setCareer({ ...career, name: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />

            {/* Description */}
            <textarea
              placeholder="Description"
              value={career.description}
              onChange={(e) =>
                setCareer({ ...career, description: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />

            {/* Qualification */}
            <input
              type="text"
              placeholder="Required Qualification"
              value={career.req_qualification}
              onChange={(e) =>
                setCareer({ ...career, req_qualification: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />

            {/* Category */}
            <input
              type="text"
              placeholder="Category"
              value={career.category}
              onChange={(e) =>
                setCareer({ ...career, category: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />

            {/* Salary Range */}
            <input
              type="number"
              placeholder="Salary Range (in INR)"
              value={career.salary_range || ""}
              onChange={(e) =>
                setCareer({
                  ...career,
                  salary_range: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />

           {/* Skills Multi-Select */}
<div className="space-y-2">
  <p className="font-semibold">Select Skills</p>
  {skills.map((s) => (
    <div key={s.skill_id} className="flex items-center gap-2">
      <input
        id={`skill-${s.skill_id}`}
        type="checkbox"
        value={s.skill_name} // send name, not id
        checked={career.skills.includes(s.skill_name)}
        onChange={() =>
          setCareer({
            ...career,
            skills: toggleSelection(career.skills, s.skill_name),
          })
        }
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
      />
      <label htmlFor={`skill-${s.skill_id}`} className="text-gray-700">
        {s.skill_name}
      </label>
    </div>
  ))}
</div>

{/* Subjects Multi-Select */}
<div className="space-y-2">
  <p className="font-semibold">Select Subjects</p>
  {subjects.map((sub) => (
    <div key={sub.subject_id} className="flex items-center gap-2">
      <input
        id={`subject-${sub.subject_id}`}
        type="checkbox"
        value={sub.subject_name} // send name
        checked={career.subjects.includes(sub.subject_name)}
        onChange={() =>
          setCareer({
            ...career,
            subjects: toggleSelection(career.subjects, sub.subject_name),
          })
        }
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
      />
      <label htmlFor={`subject-${sub.subject_id}`} className="text-gray-700">
        {sub.subject_name}
      </label>
    </div>
  ))}
</div>

            

            {/* Learning Resources */}
            <textarea
              placeholder="Learning Resources (URLs or short description)"
              value={career.learning_resources}
              onChange={(e) =>
                setCareer({ ...career, learning_resources: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
            >
              Add Career
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
