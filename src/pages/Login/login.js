import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaLinkedin, FaUserAlt } from "react-icons/fa";
import {
  loginUser,
  resetStatus,
} from "../../feature/auth/userSlice";
import "./login.css";
import { toast } from "react-toastify";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.faculty
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
      toast.success("Login Successfully");
      dispatch(resetStatus());
    }
    if (isError) {
      alert(message || "Login failed");
      dispatch(resetStatus());
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { email: "", password: "", remember: true },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <div className="lm-container">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lm-card"
      >
        {/* Left side */}
        <aside className="lm-left">
          <div className="lm-brand">
            <div className="lm-brand-icon">
              <FaUserAlt />
            </div>
            <h1>PrepMaster</h1>
          </div>
          <p className="lm-tag">
            Fast-track your interview prep — questions, mock tests, analytics.
          </p>
          <ul className="lm-features">
            <li>Real interview questions & explanations</li>
            <li>Timed mocks and performance insights</li>
            <li>Collaborative study groups</li>
          </ul>
        </aside>

        {/* Right side */}
        <section className="lm-right">
          <header className="lm-header">
            <div>
              <h2>Welcome back 👋</h2>
              <p>Sign in to continue your preparation journey</p>
            </div>
            <div className="lm-cta">
              <span>New here?</span>
              <Link to="/create-account" className="link">
                Create account
              </Link>
            </div>
          </header>

          <form onSubmit={formik.handleSubmit} className="lm-form">
            {/* Email */}
            <div className="lm-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.email && formik.errors.email ? "error" : ""
                }
                aria-invalid={
                  formik.touched.email && formik.errors.email ? "true" : "false"
                }
              />
              {formik.touched.email && formik.errors.email && (
                <p className="lm-error">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="lm-field">
              <label htmlFor="password">Password</label>
              <div className="lm-input-with-icon">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                  aria-invalid={
                    formik.touched.password && formik.errors.password
                      ? "true"
                      : "false"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="icon-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="lm-error">{formik.errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="lm-row d-flex align-items-center justify-content-between mb-1">
              <label className="lm-remember fs-6">
                <input
                  className="me-2"
                  type="checkbox"
                  name="remember"
                  checked={formik.values.remember}
                  onChange={() =>
                    formik.setFieldValue("remember", !formik.values.remember)
                  }
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="link fs-6 text-decoration-none	"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="lm-btn"
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="lm-divider">
              <span>Or continue with</span>
            </div>

            {/* Socials */}
            <div className="lm-socials">
              <button type="button" className="social google">
                <FaGoogle /> Google
              </button>
              <button type="button" className="social linkedin">
                <FaLinkedin /> LinkedIn
              </button>
            </div>

            <p className="lm-terms">
              By continuing you agree to our{" "}
              <Link to="#" className="link text-decoration-none">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="#" className="link text-decoration-none	">
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          {/* Mobile CTA */}
          <div className="lm-mobile-cta">
            Don’t have an account?{" "}
            <Link to="/create-account" className="link text-decoration-none">
              Register
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Login;
