import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CareerRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userId = localStorage.getItem("userId"); // UUID from login
        if (!userId) {
          alert("User not logged in!");
          return;
        }

        const res = await fetch(
          `http://localhost:5000/api/careers/recommendations/test/${userId}`
        );
        const data = await res.json();

        if (data.recommendations) {
          setRecommendations(data.recommendations);
          setUserName(data.user);
        } else {
          setRecommendations([]);
          alert(data.message || "No recommendations found");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        alert("Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading recommendations...</p>;

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

      {/* Main */}
      <main className="flex-grow px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Recommended Careers for {userName || "you"}
        </h2>

        {recommendations.length === 0 ? (
          <p className="text-center text-gray-600">No matching careers found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((career, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{career.name}</h3>
                <p className="text-gray-700 mb-2">{career.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Qualification:</span> {career.req_qualification}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Category:</span> {career.category || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Skills:</span> {(career.skill_id || []).join(", ")}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Subjects:</span> {(career.subject_id || []).join(", ")}
                </p>
                <p className="text-sm font-semibold mt-2">
                  Score: {career.score}%
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
