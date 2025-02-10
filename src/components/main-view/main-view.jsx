import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const API_GET_ALL_MOVIES = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies'; //move to environment var later

const MainView = () => {

  //State: list of MovieCards
  const [movies, setMovies] = useState([]);

  //State : selecting a movie by clicking on a MovieCard
  const [selectedMovie, setSelectedMovie] = useState(null);

  //API call to get list of all movies from remote Heroku server running movie_api app
  useEffect(() => {

    /* -- Attempt 1
    fetch('https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies')
      .then((response) => { response.json() })
      .then((movieData) => {
        console.log("The API get hook returned data:");
        console.log(movieData);
        setMovies(movieData);
      })
      .catch(err) {
      console.error("Caught error in API hook: " + err);
    }
    */

    /* -- Attempt 2
    try {
      console.log("API request...");
      const response = fetch(API_GET_ALL_MOVIES);
      console.log("API request response:");
      console.log(response);
      setMovies(response);
    } catch (err) {
      console.error("Error in API call hook:");
      console.error(err);
    }
    */

    // --Attempt 3
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


  }, []);

  if (movies.length === 0 || movies === null) {
    return <div>There are no movies in the list!</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null) }} />
    );
  }

  return (
    <div>
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
    </div>
  );
};

export default MainView;