import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <>
      <div className="container">
        <div className="auth-container" style={{ width: "25%" }}>
          <div className="auth-box">
            <div className="auth-header">
              <div className="auth-icon">
                <i className="fas fa-user"></i>
              </div>
              <h2>Welcome Back</h2>
              <p>Sign in to continue your interview preparation</p>
            </div>
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="password-toggle">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`far ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
              </div>

              <button
                to="/admin"
                type="submit"
                className="btn-login"
              >
                Login
              </button>

              <div className="auth-footer">
                <Link to="forgot-password">Forgot your password?</Link>
              </div>

              <div className="divider">
                <span>Or continue with</span>
              </div>

              <div className="auth-footer">
                <Link to="/create-account">Don't have an account?</Link>
              </div>

              <div className="social-login">
                <button className="social-btn google">
                  <i className="fab fa-google"></i> Google
                </button>
                <button className="social-btn linkedin">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
