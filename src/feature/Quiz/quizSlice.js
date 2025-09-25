import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { quizService } from "./quizService";

// Create Quiz
export const createQuiz = createAsyncThunk(
  "quiz/create",
  async (quizData, thunkAPI) => {
    try {
      return await quizService.create(quizData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || "Failed to create quiz"
      );
    }
  }
);

// List All Quizzes
export const listQuizzes = createAsyncThunk(
  "quiz/list",
  async (_, thunkAPI) => {
    try {
      return await quizService.getAllQuiz();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch quizzes"
      );
    }
  }
);

// Get Quiz By ID
export const getQuizById = createAsyncThunk(
  "quiz/getById",
  async (id, thunkAPI) => {
    try {
      return await quizService.getAQuiz(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch quiz"
      );
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quiz/delete",
  async (id, thunkAPI) => {
    try {
      return await quizService.deleteQuiz(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to delete quiz");
    }
  }
);

export const updateQuiz = createAsyncThunk(
  "quiz/update-quiz",
  async ({ quizId, quizData }, thunkAPI) => {
    try {
      return await quizService.updateQuiz(quizId, quizData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to update quiz"
      );
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
  selectedQuiz: null,
  deletedQuiz: null,
  updatedQuiz: null,
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
    // Create
      .addCase(createQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdQuiz = action.payload;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // List
      .addCase(listQuizzes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listQuizzes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.quizzes = action.payload;
      })
      .addCase(listQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get By ID
      .addCase(getQuizById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.selectedQuiz = action.payload;
      })
      .addCase(getQuizById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Failed to get quiz";
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedQuiz = action.payload;
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedQuiz = action.payload;
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update quiz";
      });
  },
});

export const { resetStatus } = quizSlice.actions;
export default quizSlice.reducer;
