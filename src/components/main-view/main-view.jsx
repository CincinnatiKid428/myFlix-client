import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

const API_GET_ALL_MOVIES = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies'; //move to environment var later

const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const dispatch = useDispatch();

  //const [user, setUser] = useState(storedUser ? storedUser : null);  //State: user object when logged in
  //const [token, setToken] = useState(storedToken ? storedToken : null);  //State: auth JWT token when logged in

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const movies = useSelector((state) => state.movies.list); //Redux State: movies list from API

  //API call to get list of all movies from remote Heroku server running movie_api app
  useEffect(() => {
    console.log("main-view.jsx | Starting useEffect() hook...");

    if (!token) {
      console.log("Skipping fetch until authenticated user logged in...");
      return;
    }

    //WRAP TRY-CATCH BLOCK HERE
    fetch(API_GET_ALL_MOVIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((movieData) => {
        console.log("main-view.jsx | Return from movie_api:", movieData);
        movieData ? dispatch(setMovies(movieData)) : dispatch(setMovies([]));
      })
      .catch((err) => {
        console.error("main-view.jsx | Error in API call:", err.message);
      });

  }, [token]);



  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="d-flex justify-content-center">
        <Routes>

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
                      <LoginView />
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
                    <MovieView prev="/" />
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
                    <MovieView prev="/profile" />
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
                        <MovieCard movie={movie} prev="/" />
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
                    <ProfileView />
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