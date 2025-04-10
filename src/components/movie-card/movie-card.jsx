import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

import { PropTypes } from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";

const DB_FAVORITES_URI = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies/favorites/";

export const MovieCard = ({ movie, prev }) => {

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();
  const log = logIt;

  const [isFavorite, setIsFavorite] = useState((user.FavoriteMovies).includes(movie._id));

  /**
   * Handles API call to add favorite movie to user.FavoriteMovies
   */
  const handleAddFav = async () => {
    log(LOG_LEVEL_DEBUG, `movie-card.jsx|handleAddFav()|Adding fav movie: ${movie.Title} ${movie._id}`);
    try {
      const addFavResponse = await fetch((DB_FAVORITES_URI + movie._id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const responseData = await addFavResponse.json();
      log(LOG_LEVEL_DEBUG, "movie-card.jsx|handleAddFav()|responseData:", responseData);
      if (responseData) {
        dispatch(setUser(responseData));
        setIsFavorite(true);
      } else {
        alert("Something went wrong trying to add favorite, please try again.");
      }

    } catch (e) {
      log(LOG_LEVEL_ERROR, "movie-card.jsx|handleAddFav()|Error during add handler:", e);
    }
  };

  /**
   * Handles API call to remove favorite movie to user.FavoriteMovies
   */
  const handleRemoveFav = async () => {
    log(LOG_LEVEL_DEBUG, `movie-card.jsx|handleRemoveFav|Removing fav movie: ${movie.Title} ${movie._id}`);

    try {
      const removeFavResponse = await fetch((DB_FAVORITES_URI + movie._id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const responseData = await removeFavResponse.json();
      log(LOG_LEVEL_DEBUG, "movie-card.jsx|handleRemoveFav()|responseData:", responseData);
      if (responseData) {
        dispatch(setUser(responseData));
        setIsFavorite(false);
      } else {
        alert("Something went wrong trying to remove favorite, please try again.");
      }
    } catch (e) {
      log(LOG_LEVEL_ERROR, "movie-card.jsx|handleRemoveFav()|Error during remove handler:", e);
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

//PropTypes for MovieCard holds prev path ("/" or "/profile")
MovieCard.propTypes = {
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

  prev: PropTypes.string.isRequired
};