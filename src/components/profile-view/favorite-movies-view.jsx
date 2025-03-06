import { PropTypes } from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";

export const FavoriteMoviesView = ({ user, setUser, movies, token, favoritesIdArray }) => {
  console.log("favorite-movies-view.jsx | favoritesIdArray prop is: ", favoritesIdArray);

  /**
   * 
   * @returns An array of movie objects based on their _id being included in the user.FavoriteMovies array.
   */
  function loadFavorites() {

    // Use filter to select movies whose _id is in favoritesIdArray
    const favoriteMovies = movies.filter((movie) =>
      favoritesIdArray.includes(movie._id)
    );

    console.log("favorite-movies-view.jsx|loadFavorites() | returning favoriteMovies: ", favoriteMovies);
    return favoriteMovies;
  }

  return (
    <>
      {loadFavorites().map((movie => {
        return (
          <Col key={movie._id} md={4} className="mb-3">
            <MovieCard user={user} setUser={setUser} movie={movie} token={token} prev="/profile" />
          </Col>
        );
      }))}
    </>
  );

};

FavoriteMoviesView.propTypes = {

  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
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

  favoritesIdArray: PropTypes.arrayOf(PropTypes.string).isRequired
}