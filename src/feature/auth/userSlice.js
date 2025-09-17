import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./userService";

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
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
