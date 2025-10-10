// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./userService";

// Thunks
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register(userData);
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData);
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const data = await userService.forgotPasswords(email);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Forgot password failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, passwordData }, thunkAPI) => {
    try {
      return await userService.resetPassword(token, passwordData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ token, passwordData }, thunkAPI) => {
    try {
      return await userService.changePassword({ token, passwordData });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Change password failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const requestOTP = createAsyncThunk(
  "user/requestOTP",
  async (email, thunkAPI) => {
    try {
      return await userService.requestOTP(email);
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Request OTP failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async ({ email, otp }, thunkAPI) => {
    try {
      return await userService.verifyOTP(email, otp);
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Verify OTP failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async (email, thunkAPI) => {
    try {
      return await userService.resendOTP(email);
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Resend OTP failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout thunk (calls backend to clear cookie)
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      return await userService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Logout failed");
    }
  }
);

// Load persisted user profile (optional)
const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createdUser: null,
  forgotPasswordMessage: "",
  resetPasswordMessage: "",
  changePasswordMessage: "",
  otpRequested: "",
  otpVerified: "",
  otpMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.forgotPasswordMessage = "";
      state.resetPasswordMessage = "";
      state.changePasswordMessage = "";
    },
    // local logout reducer: clears client-side state (server cookie cleared via logoutUser thunk)
    logout: (state) => {
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      localStorage.removeItem("user");
    },
    resetOTPStatus: (state) => {
      state.otpRequested = false;
      state.otpVerified = false;
      state.otpMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        state.message = "User registered successfully";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Registration failed";
        state.createdUser = null;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const user = action.payload?.user || action.payload || null;
        state.user = user;
        state.message = "Login successful";
        if (user) localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Login failed";
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.forgotPasswordMessage = action.payload;
        state.message = "Forgot password successfully";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.forgotPasswordMessage =
          action.payload || "Forgot password failed";
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.resetPasswordMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.resetPasswordMessage = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.changePasswordMessage = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.changePasswordMessage = action.payload;
      })

      // Request OTP
      .addCase(requestOTP.pending, (state) => {
        state.isLoading = true;
        state.otpMessage = "";
      })
      .addCase(requestOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.otpRequested = true;
        state.otpMessage = action.payload.message || "OTP sent successfully";
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.otpRequested = false;
        state.otpMessage = action.payload || "Request OTP failed";
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.otpMessage = "";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.otpVerified = true;
        state.otpMessage =
          action.payload.message || "OTP verified successfully";
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.otpVerified = false;
        state.otpMessage = action.payload || "Verify OTP failed";
      })

      // Resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.otpMessage = "";
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.otpMessage = action.payload.message || "OTP resent successfully";
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.otpMessage = action.payload || "Resend OTP failed";
      })
      // Logout thunk handling (clears server cookie + state)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Logged out";
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.message = action.payload || action.error?.message || "Logout failed";
      });
  },
});

export const { resetStatus, logout, resetOTPStatus } = userSlice.actions;
export default userSlice.reducer;
