import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {

  const [movies, setMovies] = useState([]); //State: list of MovieCards
  const [selectedMovie, setSelectedMovie] = useState(null); //State : selected movie (by clicking on a MovieCard)
  const [user, setUser] = useState(null); //State: tracks if user is logged in
  const [token, setToken] = useState(null); //State: tracks user JWT auth token when logged in

  if (movies.length === 0) {
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