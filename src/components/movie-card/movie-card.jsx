import { PropTypes } from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className="clickable-movie-title"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

//PropTypes for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};