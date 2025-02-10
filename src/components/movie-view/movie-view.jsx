import { PropTypes } from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageURL} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Year Released: </span>
        <span>{movie.ReleaseYear}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Rating: </span>
        <span>{movie.Rating}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.Actors.join(', ')}</span>
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
};

//PropTypes for MovieView component (contains additional validation for genre and director data)
MovieView.propTypes = {
  movie: PropTypes.shape({
    ImageURL: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Rating: PropTypes.number,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,

    Genre: PropTypes.exact({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,

    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      BirthYear: PropTypes.number.isRequired,
      DeathYear: PropTypes.number,
      Movies: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired

  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};