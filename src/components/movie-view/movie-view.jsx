import { PropTypes } from "prop-types";
import { useState } from "react";
//import { useContext } from "react";
//import AppContext from "../app-context/app-context";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router";

const DB_FAVORITES_URI = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies/favorites/";

//Increase to 1px to add debug borders
const debugBorder = "0px solid blue";

export const MovieView = ({ user, setUser, movies, token, prev }) => { //Use context vs props?

  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState((user.FavoriteMovies).includes(movieId));

  //Find movie to display
  const movie = movies.find((foundMovie) => foundMovie._id === movieId);

  //Find similar movies array
  const similarMovieArray = movies.filter((arrayMovie) => (movie.Genre.Name === arrayMovie.Genre.Name && movieId !== arrayMovie._id)) || [];


  /**
 * Handles API call to add favorite movie to user.FavoriteMovies
 */
  const handleAddFav = async () => {
    console.log("movie-view.jsx|handleAddFav()|Adding fav movie: " + movie.Title + " " + movie._id);
    try {
      const addFavResponse = await fetch((DB_FAVORITES_URI + movie._id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const responseData = await addFavResponse.json();
      console.log("movie-view.jsx|handleAddFav()|responseData:", responseData);
      if (responseData) {
        setUser(responseData);
        setIsFavorite(true);
      } else {
        alert("Something went wrong trying to add favorite, please try again.");
      }
    } catch (e) {
      console.error("movie-view.jsx|handleAddFav()|ERROR during add handler:", e);
    }
  };

  /**
   * Handles API call to remove favorite movie to user.FavoriteMovies
   */
  const handleRemoveFav = async () => {
    console.log("movie-view.jsx|handleRemoveFav|Removing fav movie: " + movie.Title + " " + movie._id);

    try {
      const removeFavResponse = await fetch((DB_FAVORITES_URI + movie._id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const responseData = await removeFavResponse.json();
      console.log("movie-view.jsx|handleRemoveFav()|responseData:", responseData);
      if (responseData) {
        setUser(responseData);
        setIsFavorite(false);
      } else {
        alert("Something went wrong trying to remove favorite, please try again.");
      }
    } catch (e) {
      console.error("movie-view.jsx|handleRemoveFav()|ERROR during remove handler:", e);
    }
  };

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


          <div className="d-flex justify-content-around mt-3" style={{ border: debugBorder }}>
            <Link to={prev}>
              <Button className="btn-md" type="button">Back</Button>
            </Link>
            {isFavorite ? (
              <Button variant="danger" className="btn-md" onClick={handleRemoveFav}>Remove Favorite</Button>
            ) : (
              <Button variant="success" className="btn-md" onClick={handleAddFav}>Add Favorite</Button>
            )}
          </div>


        </Col>
      </Row>

      {similarMovieArray.length !== 0 ? ( //Similar movies found
        <>
          <hr />
          <h3>Similar Movies:</h3>
          <Row className="justify-content-center mt-3" style={{ border: debugBorder }}>
            {
              similarMovieArray.map((similarMovie) => {
                return (
                  <Col key={similarMovie._id} md={4} sm={6} className="mb-5" style={{ border: debugBorder }}>
                    <MovieCard user={user} setUser={setUser} movie={similarMovie} token={token} prev={prev} />
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

  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }).isRequired,

  setUser: PropTypes.func.isRequired,

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
  }).isRequired),

  token: PropTypes.string.isRequired,

  prev: PropTypes.string.isRequired

};