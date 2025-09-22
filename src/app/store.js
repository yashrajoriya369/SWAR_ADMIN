import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../feature/Quiz/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
