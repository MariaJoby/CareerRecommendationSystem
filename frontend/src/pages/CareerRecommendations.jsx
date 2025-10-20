import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function CareerRecommendations() {
  const { user } = useContext(UserContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const token = user?.token; // If using JWT or Supabase auth session
      const res = await fetch("http://localhost:5000/api/careers/recommend", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if using auth
        },
      });

      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      alert("Failed to fetch recommendations. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

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

      <main className="flex-grow px-8 py-12">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Recommended Careers for {user?.name || "User"}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading recommendations...</p>
        ) : recommendations.length === 0 ? (
          <p className="text-center text-gray-600">No recommendations available yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <div
                key={rec.career_id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{rec.name}</h3>
                <p className="text-gray-700 mb-3">{rec.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Qualification:</span> {rec.req_qualification}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Match Score:</span> {rec.score}%
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
        )}
      </main>

      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
