import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="container">
        <div className="auth-container" style={{ width: "25%" }}>
          <div className="auth-box">
            <div className="auth-header">
              <div className="auth-icon">
                <i className="fas fa-user"></i>
              </div>
              <h2>Forgot Password</h2>
              <p>Enter an email to get your reset password link.</p>
            </div>
            <div className="auth-form">
              <div className="form-group">
                <label for="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <Link
                to="/admin"
                type="submit"
                className="btn btn-primary w-100 mt-3 rounded"
              >
                Reset Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
