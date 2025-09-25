import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Profile from "./pages/profile";
import User from "./pages/users";
import Content from "./pages/Quiz/createQuiz";
import Report from "./pages/report";
import ManageContent from "./pages/manageContent";
import CreateQuiz from "./pages/quiz";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manage-users" element={<User />} />
          <Route path="manage-content" element={<ManageContent />} />
          <Route
            path="manage-content/manage-quizzes"
            element={<CreateQuiz />}
          />
          <Route
            path="manage-content/manage-quizzes/create-quizzes"
            element={<Content />}
          />
          <Route
            path="manage-content/manage-quizzes/update-quizzes/:getQuizId"
            element={<Content />}
          />

          <Route path="reports" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
