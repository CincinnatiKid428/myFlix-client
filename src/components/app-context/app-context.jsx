import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";

const API_GET_ALL_MOVIES = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies'; //move to environment var later


const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);  //State: user object when logged in
  const [token, setToken] = useState(storedToken ? storedToken : null);  //State: auth JWT token when logged in
  const [movies, setMovies] = useState([]);  //State: list of all movies form DB

  //API call to get list of all movies from remote Heroku server running movie_api app
  useEffect(() => {
    console.log("app-context.jsx| Starting useEffect() hook...");

    if (!token) {
      console.log("Skipping fetch until authenticated user logged in...");
      return;
    }

    if (movies.length === 0) {
      fetch(API_GET_ALL_MOVIES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((movieData) => {
          console.log("app-context.jsx | Return from movie_api: ");
          console.log(movieData);

          movieData ? setMovies(movieData) : setMovies([]);
        })
        .catch((err) => {
          console.error("app-context.jsx | Error in API call:");
          console.error(err.message);
        });
    }


  }, [token]);

  const onLoggedIn = (authenticatedUser, AuthenticatedToken) => {
    console.log("app-context.jsx|onLoggedIn()| Updating user/token via context component.");
    setUser(authenticatedUser);
    setToken(AuthenticatedToken);
  }

  const onLoggedOut = () => {
    console.log("app-context.jsx|onLoggedOut()| Clearing user/token/localStorage via context component.");
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const contextValue = { user, setUser, movies, setMovies, token, onLoggedIn, onLoggedOut };
  console.log("app-context.jsx|contextValue:", contextValue);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;