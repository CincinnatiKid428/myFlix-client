import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";

export const FavoriteMoviesView = () => {

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();

  const favoritesIdArray = user.FavoriteMovies;

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