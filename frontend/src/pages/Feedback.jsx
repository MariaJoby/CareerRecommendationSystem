import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Feedback() {
  const { user } = useContext(UserContext); // user_id comes from here
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    description: "",
    rating: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.id) {
        alert("You must be logged in to submit feedback!");
        return;
      }

    if (!feedback.description || !feedback.rating) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id, // taken from context
          description: feedback.description,
          rating: parseFloat(feedback.rating),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Thank you for your feedback!");
        setFeedback({ description: "", rating: "" });
        navigate("/dashboard");
      } else {
        alert(result.error || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md py-5 px-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
        >
          Back
        </button>
      </nav>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Feedback
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <select
              value={feedback.rating}
              onChange={(e) =>
                setFeedback({ ...feedback, rating: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Rate your experience</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Very Poor</option>
            </select>

            <textarea
              placeholder="Share your feedback"
              value={feedback.description}
              onChange={(e) =>
                setFeedback({ ...feedback, description: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-white bg-opacity-80 backdrop-blur-md shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerPath Finder. All rights reserved.
      </footer>
    </div>
  );
}
