import { useState, useEffect, useContext } from "react";
import AppContext, { AppContextProvider } from "../app-context/app-context";

export const TestContextView = () => {

  const contextValue = { user, setUser, movies, setMovies, token, onLoggedIn, onLoggedOut } = useContext(AppContext);
  console.log("test-context.view.jsx|Context value:", contextValue);

  return (
    <AppContext.Provider value={contextValue} >
      <></>
    </AppContext.Provider>
  );
};
