import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const API_GET_ALL_MOVIES = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies'; //move to environment var later

const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);  //State: user object when logged in
  const [token, setToken] = useState(storedToken ? storedToken : null);  //State: auth JWT token when logged in
  const [movies, setMovies] = useState([]);  //State: list of MovieCards
  const [selectedMovie, setSelectedMovie] = useState(null);   //State : selecting a movie by clicking on a MovieCard

  //API call to get list of all movies from remote Heroku server running movie_api app
  useEffect(() => {
    console.log("main-view.jsx | Starting useEffect() hook...");
    console.log("main-view.jsx | [token] is: ", token);
    console.log("main-view.jsx | [user] is: ", user);
    console.log("main-view.jsx | [localStorage.token] is: ", localStorage.token);
    console.log("main-view.jsx | [localStorage.user] is: ", localStorage.user);


    if (!token) {
      console.log("Skipping fetch until authenticated user logged in...");
      return;
    }

    // Add if() to check if movies.length === 0 to prevent extra fetch() calls to API?

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

        setMovies(movieData);
      })
      .catch((err) => {
        console.error("main-view.jsx | Error in API call:");
        console.error(err.message);
      });

    /* Suggestion from ChatGPT on best method for API fetch in React application to make an async func like:
 
     // Define an async function inside useEffect
     const fetchMovies = async () => {
       try {
         const response = await fetch(API_GET_ALL_MOVIES);  // API request
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         const data = await response.json();  // Parse the JSON response
         setMovies(data);  // Update state with the fetched data
       } catch (error) {
         console.error(error.message);  // Update error state if something goes wrong
       }
     };
     fetchMovies();  // Call the async function
   */

    /* Option 2 : Fetch using async function as suggested by ChatGPT
    
        const getMovies = async () => {
          try {
            console.log("API request...");
            const response = await fetch(API_GET_ALL_MOVIES, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            });
            let movieData = await response.json();
            console.log("main-view.jsx | API request response:");
            console.log(movieData);
            setMovies(movieData);
          } catch (err) {
            console.error("main-view.jsx | Error in API call:");
            console.error(err.message);
          }
        };
    
        if (!token) {
          console.log("Skipping fetch until authenticated user logged in...");
          return;
        }
        getMovies();
    
    */

  }, [token]);

  if (!user) {
    return (
      <div>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <p>or</p>
        <SignupView />
      </div>
    );
  }

  if (movies.length === 0 || movies === null) {
    return <h2>There are no movies in the list!</h2>;
  }

  if (selectedMovie) {

    //Find similar movies array
    let similarMovies = movies.filter((arrayMovie) => selectedMovie.Genre.Name === arrayMovie.Genre.Name && selectedMovie._id !== arrayMovie._id);

    if (similarMovies.length > 0) {
      console.log(`main-view.jsx | Found ${similarMovies.length} movies similar to "${selectedMovie.Title}" by Genre: `);
      console.log(similarMovies);

      return (
        <div>
          <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null) }} />
          <br />
          <hr />
          <h2>Similar Movies:</h2>
          {similarMovies.map((movie) => {
            return (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            );
          })}
          <br />
        </div>
      );
    } else {
      console.log(`main-view.jsx | Found no movies similar to "${selectedMovie.Title}" by Genre.`);

      return (
        <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null) }} />
      );
    }
  }

  return (
    <div>
      <h2>Welcome, {user.Username}!</h2>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} />
        );
      })}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default MainView;