//-----------------------------------------------------------------
// Defines actions that store the movies list from the API
//     & the filtered list of movie IDs
//-----------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";

const log = logIt;

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
      log(LOG_LEVEL_DEBUG, "REDUCER|movies.js|setMovies() to:", action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      log(LOG_LEVEL_DEBUG, "REDUCER|movies.js|setFilter() to:", action.payload);
    }
  }
});

export const { setMovies, setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;