import React from "react";
import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);  //State: user object when logged in
  const [token, setToken] = useState(storedToken ? storedToken : null);  //State: auth JWT token when logged in
  const [movies, setMovies] = useState([]);  //State: list of all movies form DB

  onLoggedIn = (authenticatedUser, AuthenticatedToken) => {
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

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;