import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { quizService } from "./quizService";

export const registerQuiz = createAsyncThunk(
  "quiz/create",
  async (quizData, thunkAPI) => {
    try {
      return await quizService.create(quizData);
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Creation Failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  quizzes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  createdQuiz: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdQuiz = action.payload;
        state.message = "Quiz Created";
      })
      .addCase(registerQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Creation Failed";
        state.createdQuiz = null;
      });
  },
});

export const { resetStatus } = quizSlice.actions;
export default quizSlice.reducer;
