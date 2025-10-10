// src/services/userService.js
import axios from "../../utils/axiosConfig";

/**
 * Note:
 * - API_BASE should be configured in axiosConfig (baseURL), so paths here are relative.
 * - Public faculty signup endpoint is assumed to be: POST /api/auth/signup
 *   (This matches your auth routes: router.post('/signup', registerUser))
 * - Login: POST /api/auth/login
 * - Forgot/Reset/Change OTP flows use the routes you already have.
 */

/* -------------------------
   Faculty Register (public)
   -------------------------
   body: { fullName, email, password, confirmPassword, roles: 'faculty' }
   Response: { message: "..."}
*/
const registerFaculty = async (userData) => {
  try {
    // ensure role is faculty
    const payload = { ...userData, roles: "faculty" };
    const response = await axios.post(`auth/signup`, payload);
    return response.data;
  } catch (error) {
    console.error("registerFaculty failed:", error?.response?.data || error.message);
    throw error;
  }
};

/* -------------------------
   Login
   -------------------------
   body: { email, password }
   Response: token cookie set by backend + user object in body
*/
const login = async (userData) => {
  try {
    const response = await axios.post(`auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("login failed:", error?.response?.data || error.message);
    throw error;
  }
};

/* -------------------------
   Forgot Password
   ------------------------- */
const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("forgotPassword failed:", error?.response?.data || error.message);
    throw error;
  }
};

/* -------------------------
   Reset Password (token)
   PUT/POST depending on backend. Your backend used POST earlier.
   ------------------------- */
const resetPassword = async (token, passwordData) => {
  try {
    const response = await axios.post(`auth/reset-password/${token}`, passwordData);
    return response.data;
  } catch (error) {
    console.error("resetPassword failed:", error?.response?.data || error.message);
    throw error;
  }
};

/* -------------------------
   Change Password
   If your backend expects an auth token in cookie, you may not need the passed token.
   This function supports either passing token (as header) or relying on cookie.
   ------------------------- */
const changePassword = async (passwordData, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`auth/change-password`, passwordData, { headers });
    return response.data;
  } catch (error) {
    console.error("changePassword failed:", error?.response?.data || error.message);
    throw error;
  }
};

/* -------------------------
   Update Profile (faculty)
   - PUT to auth/update-profile (adjust path if you use /user/:id or /auth/profile)
   - payload may include fullName, mobile etc.
   ------------------------- */
const updateProfile = async (profileData, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.put(`auth/update-profile`, profileData, { headers });
    return response.data;
  } catch (error) {
    console.error("updateProfile failed:", error?.response?.data || error.message);
    throw error;
  }
};

/* -------------------------
   OTP flows
   ------------------------- */
const requestOTP = async (email) => {
  try {
    const response = await axios.post(`auth/request-otp`, { email });
    return response.data;
  } catch (error) {
    console.error("requestOTP failed:", error?.response?.data || error.message);
    throw error;
  }
};

const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`auth/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    console.error("verifyOTP failed:", error?.response?.data || error.message);
    throw error;
  }
};

const resendOTP = async (email) => {
  try {
    const response = await axios.post(`auth/resend-otp`, { email });
    return response.data;
  } catch (error) {
    console.error("resendOTP failed:", error?.response?.data || error.message);
    throw error;
  }
};

/* -------------------------
   Logout
   ------------------------- */
const logout = async () => {
  try {
    const response = await axios.post(`auth/logout`);
    return response.data;
  } catch (error) {
    console.error("logout failed:", error?.response?.data || error.message);
    throw error;
  }
};

export const userService = {
  registerFaculty,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  requestOTP,
  verifyOTP,
  resendOTP,
  logout,
};
