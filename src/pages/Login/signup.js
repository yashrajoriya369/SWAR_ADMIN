import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetStatus,
  requestOTP,
  verifyOTP
} from "../../feature/auth/userSlice";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "./login.css";

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
    .min(8, "Password must be at least 8 characters")
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpMessageType, setOtpMessageType] = useState("");

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.faculty
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success("Account Created.");
      dispatch(resetStatus());
    }
    if (isError) {
      toast.error(message || "Something went wrong!");
      dispatch(resetStatus());
    }
  }, [isSuccess, isError, message, dispatch, navigate]);

  useEffect(() => {
    let interval;
    if (otpStep && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpStep, timer]);

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

  const handleSendOTP = async () => {
    try {
      const res = await dispatch(requestOTP(formik.values.email)).unwrap();
      setOtpMessage(res.message);
      setOtpMessageType("success");
      setOtpStep(true);
      setTimer(120);
      setCanResend(false);
    } catch (error) {
      setOtpMessage(error || "failed to send opt");
      setOtpMessageType("error");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await dispatch(
        verifyOTP({ email: formik.values.email, otp })
      ).unwrap();
      setOtpMessage(res.message);
      setOtpMessageType("success");
      setIsEmailVerified(true);
    } catch (error) {
      setOtpMessage(error || "invalid otp!");
      setOtpMessageType("error");
      setIsEmailVerified(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await dispatch(requestOTP(formik.values.email)).unwrap();
      setTimer(120);
      setCanResend(false);
    } catch (error) {}
  };

  const handleEmailChange = (e) => {
    formik.handleChange(e);
    setOtpStep(false);
    setOtp("");
    setIsEmailVerified(false);
    setOtpMessage("");
  };

  return (
    <div className="lm-container">
      <motion.div
        className="lm-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Left Panel */}
        <aside className="lm-left">
          <div className="lm-brand">
            <div className="lm-brand-icon">
              <FaUserAlt />
            </div>
            <h1>PrepMaster</h1>
          </div>
          <p className="lm-tag">
            Join PrepMaster and start practising for interviews with trusted
            content.
          </p>
          <ul className="lm-features">
            <li>Guided learning paths</li>
            <li>Mock interviews & analytics</li>
            <li>Community-driven feedback</li>
          </ul>
        </aside>

        {/* Right Panel */}
        <section className="lm-right">
          <div className="lm-header">
            <div>
              <h2 className="mb-1">Create Account</h2>
              <p>Join PrepMaster to start preparing for interviews</p>
            </div>
            <div className="lm-cta flex">
              <span>Already a member?</span>
              <Link to="/" className="link">
                Sign in
              </Link>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="lm-form">
            {/* Full Name */}
            <div className="lm-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.fullName && formik.errors.fullName
                    ? "error"
                    : ""
                }
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="lm-error">{formik.errors.fullName}</p>
              )}
            </div>

            {/* Email + Send OTP */}
            <div className="lm-field lm-email-otp">
              <label htmlFor="email">Email</label>
              <div className="lm-email-otp-row">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formik.values.email}
                  onChange={handleEmailChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }
                  disabled={isEmailVerified} // lock email once OTP sent
                />

                {/* OTP input always visible */}
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                {/* Button changes based on step */}
                {!otpStep ? (
                  <button
                    type="button"
                    className="otp-btn"
                    onClick={handleSendOTP}
                  >
                    Send
                  </button>
                ) : (
                  <button
                    type="button"
                    className="otp-verify-btn"
                    onClick={handleVerifyOTP}
                  >
                    Verify
                  </button>
                )}
              </div>
              <div className="d-flex justify-content-between mt-1">
                {otpMessage && (
                  <p
                    style={{ fontSize: "13px" }}
                    className={
                      otpMessageType === "success" ? "otp-success" : "otp-error"
                    }
                  >
                    {otpMessage}
                  </p>
                )}
                {/* Timer & Resend */}
                {otpStep && (
                  <div
                    style={{
                      fontSize: 13,
                      color: "#555",
                    }}
                  >
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        style={{
                          color: "#2563eb",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <span>
                        Resend available in {Math.floor(timer / 60)}:
                        {("0" + (timer % 60)).slice(-2)}
                      </span>
                    )}
                  </div>
                )}
              </div>
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
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="icon-btn"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="lm-error">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="lm-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="lm-input-with-icon">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "error"
                      : ""
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="icon-btn"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="lm-error">{formik.errors.confirmPassword}</p>
                )}
            </div>

            {/* Create Account */}
            <button
              type="submit"
              className="lm-btn"
              disabled={
                isLoading ||
                !formik.isValid ||
                !formik.dirty ||
                !isEmailVerified
              }
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Social & Terms (UI unchanged) */}
            <div style={{ marginTop: 14 }} className="lm-terms">
              By signing up, you agree to our{" "}
              <Link
                to="/terms-and-conditions"
                className="link text-decoration-none"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="link text-decoration-none">
                Privacy Policy
              </Link>
              .
            </div>
            <div style={{ marginTop: 16 }} className="lm-mobile-cta">
              Already have an account?{" "}
              <Link to="/" className="link text-decoration-none">
                Sign in
              </Link>
            </div>
          </form>
        </section>
      </motion.div>
    </div>
  );
};

export default SignUp;
