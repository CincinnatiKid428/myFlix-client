import { useState, useEffect } from "react";
import { AppContextProvider } from "../app-context/app-context";
import TestContextView from "../test-context-view/test-context-view";

import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";


const API_GET_ALL_MOVIES = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies'; //move to environment var later

const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);  //State: user object when logged in
  const [token, setToken] = useState(storedToken ? storedToken : null);  //State: auth JWT token when logged in
  const [movies, setMovies] = useState([]);  //State: list of MovieCards


  //API call to get list of all movies from remote Heroku server running movie_api app
  useEffect(() => {
    console.log("main-view.jsx | Starting useEffect() hook...");

    if (!token) {
      console.log("Skipping fetch until authenticated user logged in...");
      return;
    }

    fetch(API_GET_ALL_MOVIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((movieData) => {
        console.log("main-view.jsx | Return from movie_api: ");
        console.log(movieData);

        movieData ? setMovies(movieData) : setMovies([]);
      })
      .catch((err) => {
        console.error("main-view.jsx | Error in API call:");
        console.error(err.message);
      });

  }, [token]);

  const onLoggedIn = (authenticatedUser, AuthenticatedToken) => {
    setUser(authenticatedUser);
    setToken(AuthenticatedToken);
  }

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="d-flex justify-content-center">
        <Routes>

          <Route
            path="/testcontext"
            element={
              <>
                <Col xs={12} sm={9} lg={6} xl={5} className="mt-5">
                  <AppContextProvider>
                    <TestContextView />
                  </AppContextProvider>
                </Col>
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col xs={12} sm={9} lg={6} xl={5} className="mt-5">
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <>
                    <Col xs={12} sm={9} lg={6} xl={5} className="mt-5">
                      <LoginView onLoggedIn={onLoggedIn} />
                    </Col>
                  </>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>There are no movies in the list!</Col>
                ) : (
                  <Col md={10}>
                    <MovieView user={user} setUser={setUser} movies={movies} token={token} prev="/" />
                  </Col>
                )
                }
              </>
            }
          />

          <Route
            path="/fav/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>There are no movies in the list!</Col>
                ) : (
                  <Col md={10}>
                    <MovieView user={user} setUser={setUser} movies={movies} token={token} prev="/profile" />
                  </Col>
                )
                }
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>There are no movies in the list!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col key={movie._id} md={3} sm={6} className="mb-3">
                        <MovieCard user={user} setUser={setUser} movie={movie} token={token} prev="/" />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <>
                    <ProfileView user={user} setUser={setUser} movies={movies} token={token} onLoggedOut={onLoggedOut} />
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;