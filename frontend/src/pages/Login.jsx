import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // make sure the path is correct
import supabase from "../supabaseClient"; // import your frontend supabase client

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // added to store user globally
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  const adminEmail = "admin@example.com";
  const adminPassword = "Admin@123";

  // Check if admin credentials entered
  if (email === adminEmail && password === adminPassword) {
    alert("Welcome Admin!");
    navigate("/admin");
    return; // stop here (don’t call Supabase)
  }

  // Otherwise, authenticate normal user with Supabase
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
      alert(`Welcome ${data.user.email}!`);
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
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide">
          CareerPath Finder
        </h1>
        <div>
          <Link
            to="/register"
            className="px-5 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition duration-300"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Login Form Section */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500">
            Login to continue your career journey
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Register redirect */}
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create Account
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
