//-----------------------------------------------------------------
// Defines an actions that store the authenticated user after login
//    & updated user object with profile update logic
//-----------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      console.log(
        "REDUCER|user.js|setUser() to action.payload:",
        action.payload
      );
      return action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
