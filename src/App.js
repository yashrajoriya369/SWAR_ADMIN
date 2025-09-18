import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="create-account" element={<SignUp />} /> */}
        <Route path="admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="profile" element={<Profile />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="history" element={<History />} />
          <Route path="team" element={<Team />} />
          <Route path="login" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
