import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/auth/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
