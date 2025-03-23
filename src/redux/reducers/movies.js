//-----------------------------------------------------------------
// Defines actions that store the movies list from the API
//     & the filtered list of movie IDs
//-----------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
      console.log("REDUCER|movies.js|setMovies() to:", action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      console.log("REDUCER|movies.js|setFilter() to:", action.payload);

    }
  }
});

export const { setMovies, setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;