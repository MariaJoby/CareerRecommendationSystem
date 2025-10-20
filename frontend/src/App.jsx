// src/App.jsx
import ProtectedRoute from "./components/ProtectedRoute";

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
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <Router>
  <Routes>
    {/* Landing Page */}
    <Route path="/" element={<Landing />} />

    {/* Auth Pages */}
    <Route path="/register" element={<Registration />} />
    <Route path="/login" element={<Login />} />

    {/* Protected User Pages */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/edit-profile"
      element={
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      }
    />
    <Route path="/admin" element={<AdminPage/>}/>
    <Route
      path="/career-recommendations"
      element={
        <ProtectedRoute>
          <CareerRecommendations />
        </ProtectedRoute>
      }
    />
    <Route
      path="/learning-resource"
      element={
        <ProtectedRoute>
          <LearningResource />
        </ProtectedRoute>
      }
    />
    <Route
      path="/new-recommendation"
      element={
        <ProtectedRoute>
          <NewRecommendation />
        </ProtectedRoute>
      }
    />
  </Routes>
</Router>

  );
}

export default App;
