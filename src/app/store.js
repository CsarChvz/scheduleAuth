import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth";
import scheduleReducer from "../features/schedules/schedules";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
  },
});
