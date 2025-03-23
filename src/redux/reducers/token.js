//-----------------------------------------------------------------
// Defines an action that stores the authentication token
//-----------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: null,
  reducers: {
    setToken: (state, action) => {
      console.log(
        "REDUCER|token.js|setToken() to action.payload:",
        action.payload
      );
      return action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;