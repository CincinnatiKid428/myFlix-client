import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";



export const FavoriteMoviesView = () => {

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();
  const log = logIt;

  const favoritesIdArray = user.FavoriteMovies;

  log(LOG_LEVEL_DEBUG, "favorite-movies-view.jsx | favoritesIdArray prop is: ", favoritesIdArray);

  /**
   * 
   * @returns An array of movie objects based on their _id being included in the user.FavoriteMovies array.
   */
  function loadFavorites() {

    // Use filter to select movies whose _id is in favoritesIdArray
    const favoriteMovies = movies.filter((movie) =>
      favoritesIdArray.includes(movie._id)
    );

    log(LOG_LEVEL_DEBUG, "favorite-movies-view.jsx|loadFavorites() | returning favoriteMovies: ", favoriteMovies);
    return favoriteMovies;
  }

  return (
    <>

      <h4>{user.Username}'s Favorite Movies:</h4>
      <hr />
      {user.FavoriteMovies.length !== 0 ? (
        <>
          {loadFavorites().map((movie) => (

            <Col key={movie._id} md={3} sm={6} className="mb-3">
              <MovieCard movie={movie} prev="/profile" />
            </Col>
          ))}
        </>
      ) : (
        <p>No movies added to favorites...</p>
      )
      }
    </>
  );

};