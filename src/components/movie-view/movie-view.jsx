import { PropTypes } from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router";

//Increase to 1px to add debug borders
const debugBorder = "0px solid blue";

export const MovieView = ({ movies }) => {

  const { movieId } = useParams();
  console.log("movie-view.jsx | movieId from useParms() is :" + movieId);
  console.log("movie-view.jsx | movies array from props is :");
  console.log(movies);

  //Find movie to display in MovieView
  const movie = movies.find((foundMovie) => foundMovie._id === movieId);
  console.log("movie-view.jsx | movie from .find() is :");
  console.log(movie);

  //Find similar movies array
  const similarMovieArray = movies.filter((arrayMovie) => (movie.Genre.Name === arrayMovie.Genre.Name && movieId !== arrayMovie._id)) || [];
  console.log("movie-view.jsx | similarMovieArray :");
  console.log(similarMovieArray);

  return (
    <>
      {window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) /*Return screen to top each time user is in a new MovieView*/}
      <Row>
        <Col xs={12} md={5} className="d-flex justify-content-center" style={{ border: debugBorder }}>
          <img className="mt-3" src={movie.ImageURL} style={{ borderRadius: '5px', maxWidth: "100%" }} />
        </Col>
        <Col xs={12} md={7} className="mt-3" style={{ border: debugBorder }}>
          <div>
            <span className="movie-view-info-field">Title:</span>
            <span> {movie.Title}</span>
          </div>
          <div>
            <span className="movie-view-info-field">Released:</span>
            <span> {movie.ReleaseYear}</span>
          </div>
          <div>
            <span className="movie-view-info-field">Description:</span>
            <span> {movie.Description}</span>
          </div>
          <div>
            <span className="movie-view-info-field">Genre:</span>
            <span> {movie.Genre.Name}</span>
          </div>
          <div>
            <span className="movie-view-info-field">Director:</span>
            <span> {movie.Director.Name}</span>
          </div>
          <div>
            <span className="movie-view-info-field">Rating:</span>
            <span> {movie.Rating}</span>
          </div>
          <div>
            <span className="movie-view-info-field">Actors:</span>
            <span> {movie.Actors.join(', ')}</span>
          </div>

          <Link to="/">
            <div className="d-flex justify-content-center mt-3" style={{ border: debugBorder }}>
              <Button type="button">Back</Button>
            </div>
          </Link>

        </Col>
      </Row>

      {similarMovieArray.length !== 0 ? ( //Similar movies found
        <>
          <hr />
          <h3>Similar Movies:</h3>
          <Row className="justify-content-center mt-3" style={{ border: debugBorder }}>
            {
              similarMovieArray.map((similarMovie) => {
                console.log("movie-view.jsx | Similar movies - Placing MovieCard for :", similarMovie.Title);
                return (
                  <Col key={similarMovie._id} md={4} className="mb-5" style={{ border: debugBorder }}>
                    <MovieCard movie={similarMovie} />
                  </Col>
                );
              })
            }
          </Row>
        </>
      ) : ( //No similar movies found
        <br />
      )
      }

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