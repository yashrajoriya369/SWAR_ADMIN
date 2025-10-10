import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../feature/Quiz/quizSlice";
import facultyReducer from "../feature/auth/userSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    faculty: facultyReducer,
  },
});
