import { PropTypes } from "prop-types";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const DB_FAVORITES_URI = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies/favorites/";

export const MovieCard = ({ user, setUser, movie, token, prev }) => {

  const [isFavorite, setIsFavorite] = useState((user.FavoriteMovies).includes(movie._id));

  /**
   * Handles API call to add favorite movie to user.FavoriteMovies
   */
  const handleAddFav = async () => {
    console.log("movie-card.jsx|handleAddFav()|Adding fav movie: " + movie.Title + " " + movie._id);
    try {
      const addFavResponse = await fetch((DB_FAVORITES_URI + movie._id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const responseData = await addFavResponse.json();
      //console.log("movie-card.jsx|handleAddFav()|responseData:", responseData);
      if (responseData) {
        setUser(responseData);
        setIsFavorite(true);
      } else {
        alert("Something went wrong trying to add favorite, please try again.");
      }

    } catch (e) {
      console.error("movie-card.jsx|handleAddFav()|ERROR during add handler:", e);
    }
  };

  /**
   * Handles API call to remove favorite movie to user.FavoriteMovies
   */
  const handleRemoveFav = async () => {
    console.log("movie-card.jsx|handleRemoveFav|Removing fav movie: " + movie.Title + " " + movie._id);

    try {
      const removeFavResponse = await fetch((DB_FAVORITES_URI + movie._id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const responseData = await removeFavResponse.json();
      console.log("movie-card.jsx|handleRemoveFav()|responseData:", responseData);
      if (responseData) {
        setUser(responseData);
        setIsFavorite(false);
      } else {
        alert("Something went wrong trying to remove favorite, please try again.");
      }
    } catch (e) {
      console.error("movie-card.jsx|handleRemoveFav()|ERROR during remove handler:", e);
    }


  };

  /* Will hold correct back-button route to establish if movie was  
  clicked in the main-view or from favorites list in profile-view */
  let movieViewRouteURL = "";
  if (prev === "/profile") {
    movieViewRouteURL = `/fav/movies/${encodeURIComponent(movie._id)}`;
  } else {
    movieViewRouteURL = `/movies/${encodeURIComponent(movie._id)}`;
  }


  return (

    <Card className="h-100 text-center">
      <Link to={movieViewRouteURL} >
        <Card.Img variant="top" src={movie.ImageURL} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={movieViewRouteURL} >
          <Card.Title style={{ color: "#000000" }}>{movie.Title}</Card.Title>
        </Link >
      </Card.Body>
      {isFavorite ? (
        <Button variant="danger" className="btn-sm mt-auto w-auto" onClick={handleRemoveFav}>Remove Favorite</Button>
      ) : (
        <Button variant="success" className="btn-sm mt-auto w-auto" onClick={handleAddFav}>Add Favorite</Button>
      )}
    </Card >

  );
};

//PropTypes for MovieCard
MovieCard.propTypes = {

  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,

  setUser: PropTypes.func.isRequired,

  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired
  }).isRequired,

  token: PropTypes.string.isRequired,

  prev: PropTypes.string.isRequired
};