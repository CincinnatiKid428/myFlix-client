//-----------------------------------------------------------------
// Defines an actions that store the authenticated user after login
//    & updated user object with profile update logic
//-----------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";

const log = logIt;

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      log(LOG_LEVEL_DEBUG,
        "REDUCER|user.js|setUser() to action.payload:",
        action.payload
      );
      return action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
