//-----------------------------------------------------------------
// Defines an action that stores the authentication token
//-----------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: "",
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;