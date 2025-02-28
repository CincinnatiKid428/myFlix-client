import { MovieCard } from "../movie-card/movie-card";
import { PropTypes } from "prop-types";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router";
import { Link } from "react-router";


export const MovieView = ({ movies }) => {

  const { movieId } = useParams();
  console.log("movie-view.jsx | movieId from useParms() is :" + movieId);
  console.log("movie-view.jsx | movies array from props is:");
  console.log(movies);


  const movie = movies.find((foundMovie) => foundMovie._id === movieId);
  console.log("movie-view.jsx | movie from .find() is :");
  console.log(movie);


  return (
    <>
      {window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) /*Return screen to top each time user is in a new MovieView*/}

      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <img className="w-35 mt-3" src={movie.ImageURL} style={{ borderRadius: '5px' }} />
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

      <Link to="/">
        <Button type="button">Back</Button>
      </Link>
      <hr />
      <h3>Similar Movies:</h3>
      <Row className="justify-content-center">
        {
          movies.filter((arrayMovie) => movie.Genre.Name === arrayMovie.Genre.Name && movieId !== arrayMovie._id).map((similarMovie) => {
            console.log("movie-view.jsx | Similar movies - Placing MovieCard for :", similarMovie.Title);
            return (
              <Col key={similarMovie._id} md={4} className="mb-5">
                <MovieCard movie={similarMovie} />
              </Col>
            );
          })
        }
      </Row>
    </>
  );
};

//PropTypes for MovieView component (contains additional validation for genre and director data)
MovieView.propTypes = {

  movies: PropTypes.arrayOf(PropTypes.shape({
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
  }).isRequired)

};