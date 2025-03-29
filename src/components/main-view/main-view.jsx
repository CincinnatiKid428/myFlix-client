import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

const API_GET_ALL_MOVIES = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies'; //move to environment var later

const MainView = () => {

  //const storedUser = JSON.parse(localStorage.getItem("user"));
  //const storedToken = localStorage.getItem("token");

  const dispatch = useDispatch();

  const [loadingMovies, setLoadingMovies] = useState(true); //State: Movies loading - conditional for rendering views

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const movies = useSelector((state) => state.movies.list); //Redux State: movies list from API

  //API call to get list of all movies from remote Heroku server running movie_api app
  useEffect(() => {
    console.log("main-view.jsx | Starting useEffect() hook...");

    async function fetchMovieData() {

      if (!token) {
        console.log("Skipping fetch until authenticated user logged in...");
        return;
      }

      if (movies.length === 0) {
        try {
          setLoadingMovies(true);
          const response = await fetch(API_GET_ALL_MOVIES, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          const responseJSON = await response.json();
          console.log("main-view.jsx | Return from movie_api:", responseJSON);

          if (responseJSON) {
            dispatch(setMovies(responseJSON));
          } else {
            dispatch(setMovies([]));
          }
        } catch (e) {
          console.error("main-view.jsx|Error in API call:", e);
        } finally {
          setLoadingMovies(false);
        }
      }

    }
    fetchMovieData();
  }, [token]);

  //If movies are loading don't render the regular view, render loading spinner...
  if (!movies && loadingMovies) {
    return (
      <>
        <NavigationBar />
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  }

  //...Othewise render appropriate route/view
  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="d-flex justify-content-center">
        <Routes>

          <Route
            path="/myFlix-client"
            element={
              <Navigate to="/"></Navigate>
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
                ) : !movies || movies.length === 0 ? (
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
                ) : !movies || movies.length === 0 ? (
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
                ) : (
                  <MoviesList />
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