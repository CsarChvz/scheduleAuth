import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "schedules",
});

export const { restoreToken, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
