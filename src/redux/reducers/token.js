//-----------------------------------------------------------------
// Defines an action that stores the authentication token
//-----------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";

const log = logIt;

const tokenSlice = createSlice({
  name: "token",
  initialState: null,
  reducers: {
    setToken: (state, action) => {
      log(LOG_LEVEL_DEBUG,
        "REDUCER|token.js|setToken() to action.payload:",
        action.payload
      );
      return action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;