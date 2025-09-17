import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { registerUser, resetStatus } from "../feature/auth/userSlice";
import { useDispatch, useSelector } from "react-redux";

const signUpSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at lease 8 characters")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
      "Password must include uppercase, lowercase, and a number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const newUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError, isLoading, message } = newUser;

  useEffect(() => {
    if (isSuccess) {
      alert("User registerd successfully");
      navigate("/");
      dispatch(resetStatus());
    }
    if (isError) {
      alert("Something went wrong!");
      dispatch(resetStatus());
    }
  }, [isSuccess, isError, message, dispatch, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="container">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <div className="auth-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h2>Create Account</h2>
            <p>Join CLAMIS to start preparing for interviews</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                name="fullName"
                type="text"
                id="signup-name"
                className="form-control"
                placeholder="Enter your full name"
                value={formik.values.fullName}
                onChange={formik.handleChange("fullName")}
                onBlur={formik.handleBlur("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error">{formik.errors.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                name="email"
                type="email"
                id="signup-email"
                className="form-control"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <div className="password-toggle">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  className="form-control"
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
                <i
                  className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm">Confirm Password</label>
              <div className="password-toggle">
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  id="signup-confirm"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  )}
                <i
                  className={`far ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="auth-footer">
              <p>
                By signing up, you agree to our{" "}
                <Link to="/terms-and-conditions">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </p>
            </div>

            <div className="divider">
              <span>Or sign up with</span>
            </div>

            <div className="auth-footer">
              <Link to="/">Already have an account?</Link>
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
  );
};

export default SignUp;
