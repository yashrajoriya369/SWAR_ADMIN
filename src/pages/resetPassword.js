import React from "react";

const ResetPassword = () => {
  return (
    <>
      <div className="container">
        <div className="auth-container" style={{ width: "25%" }}>
          <div className="auth-box">
            <div className="auth-header">
              <div className="auth-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h2>Reset Password</h2>
              <p>Enter password for reset password</p>
            </div>
            <div className="auth-form">
              <div className="form-group">
                <label for="signup-password">Password</label>
                <div className="password-toggle">
                  <input
                    type="password"
                    id="signup-password"
                    className="form-control"
                    placeholder="Create a password"
                  />
                  <i className="far fa-eye" id="toggle-signup-password"></i>
                </div>
              </div>

              <div className="form-group">
                <label for="signup-confirm">Confirm Password</label>
                <div className="password-toggle">
                  <input
                    type="password"
                    id="signup-confirm"
                    className="form-control"
                    placeholder="Confirm your password"
                  />
                  <i className="far fa-eye" id="toggle-signup-confirm"></i>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3 rounded w-100"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
