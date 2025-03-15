import React, { useContext } from "react";
import AppContext from "../app-context/app-context";

const TestContextView = () => {
  console.log("test-context-view.jsx| GOT HERE... trying to get context values...");
  console.log("AppContext", AppContext);
  const { user, setUser, movies, setMovies, token, onLoggedIn, onLoggedOut } = useContext(AppContext);
  console.log("test-context.view.jsx|Got the context values...");
  console.log("user", user);
  console.log("movies", movies);
  console.log("token", token);

  return (
    <>
      <div>
        <h5>user context values: </h5>
        <span>Username: {user.Username}</span><br />
        <span>Email: {user.Email}</span><br />
        <span>Birthdate: {user.Birthdate}</span><br />
        <span>FavoriteMovies: {user.FavoriteMovies.join(', ')}</span>
      </div>
      <div>
        <h5>movies context value: </h5>
        <p>{JSON.stringify(movies)}</p>
      </div>
      <div>
        <h5>token context value: </h5>
        <p>{token}</p>
      </div>
    </>
  );
};
export default TestContextView;