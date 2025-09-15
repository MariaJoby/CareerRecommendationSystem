// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import CareerRecommendations from "./pages/CareerRecommendations";
import LearningResource from "./pages/LearningResource";
import NewRecommendation from "./pages/NewRecommendation";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Auth Pages */}
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* User Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route
          path="/career-recommendations"
          element={<CareerRecommendations />}
        />
        <Route path="/learning-resource" element={<LearningResource />} />
        <Route
          path="/new-recommendation"
          element={<NewRecommendation />}
        />
      </Routes>
    </Router>
  );
}

export default App;
