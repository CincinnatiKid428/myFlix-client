import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
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
    /*
    console.log("main-view.jsx | [token] is: ", token);
    console.log("main-view.jsx | [user] is: ", user);
    console.log("main-view.jsx | [localStorage.token] is: ", localStorage.token);
    console.log("main-view.jsx | [localStorage.user] is: ", localStorage.user);
    */

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


  return (
    <BrowserRouter>
      <Row className="d-flex justify-content-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <h4>Sign up for an account:</h4>
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
                  <Col md={6}>
                    <h4>Log in with username and password:</h4>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
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
                    <MovieView movies={movies} />
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
                    {/*Move this <div> to the <Navbar> </Navbar>*/}
                    <div>
                      <span className="fs-4">Welcome, {user.Username}!</span>
                      <Button
                        variant="primary"
                        className="mb-2 mt-2"
                        style={{ float: "right" }}
                        onClick={() => {
                          setUser(null)
                          setToken(null)
                          localStorage.clear()
                        }}
                      >
                        Logout
                      </Button>
                    </div>


                    {movies.map((movie) => (
                      <Col key={movie._id} md={3} className="mb-3">
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
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


/*
        {
          !user ? ( // No user logged in yet

            <Col md={6}>
              <h4>Log in with username and password:</h4>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />

              <hr />

            </Col>

          ) : (movies.length === 0 || movies === null) ? ( // Movie list state var is empty
            <h2>There are no movies in the list!</h2>

          ) : selectedMovie ? ( // Movie selected
            <>
              <Col md={10}>
                <MovieView movie={selectedMovie} onBackClick={() => {
                  setSelectedMovie(null);
                }}
                />

                <hr />
                <h2>Similar Movies:</h2>
              </Col>
              {
                movies.filter((arrayMovie) => selectedMovie.Genre.Name === arrayMovie.Genre.Name && selectedMovie._id !== arrayMovie._id).map((movie) => {
                  console.log("Placing MovieCard for :", movie.Title);
                  return (
                    <Col key={movie._id} md={3} className="mb-5">
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                      />
                    </Col>
                  );
                })
              }
            </>

          ) : ( // Default logged in main-view movie listing

            <>
              <div>
                <span className="fs-4">Welcome, {user.Username}!</span>
                <Button
                  variant="primary"
                  className="mb-2 mt-2"
                  style={{ float: "right" }}
                  onClick={() => {
                    setUser(null)
                    setToken(null)
                    localStorage.clear()
                  }}
                >
                  Logout
                </Button>
              </div>
              {movies.map((movie) => {
                return (
                  <Col key={movie._id} md={3} className="mb-3">
                    <MovieCard
                      movie={movie}
                      onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }}
                    />
                  </Col>
                );
              })}

            </>
            */


export default MainView;