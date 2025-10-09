import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./component/MainLayout";

// Pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Users from "./pages/users";
import ManageContent from "./pages/manageContent";
import ManageQuizzes from "./pages/quiz";
import QuizForm from "./pages/Quiz/createQuiz";
import Report from "./pages/report";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Public Routes */}
        <Route path="/" element={<Login />} />

        {/* 🔹 Protected Admin Routes */}
        <Route path="admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manage-users" element={<Users />} />
          <Route path="manage-content" element={<ManageContent />} />

          {/* Nested under Manage Content */}
          <Route path="manage-content/manage-quizzes" element={<ManageQuizzes />} />
          <Route path="reports" element={<Report />} />
        </Route>

        {/* 🔹 Quiz Create & Update (outside MainLayout for full-screen form) */}
        <Route
          path="admin/manage-content/manage-quizzes/create"
          element={<QuizForm />}
        />
        <Route
          path="admin/manage-content/manage-quizzes/edit/:getQuizId"
          element={<QuizForm />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
