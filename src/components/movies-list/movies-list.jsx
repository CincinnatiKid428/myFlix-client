import React from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter"; //Search bar component

export const MoviesList = () => {

  const movies = useSelector((state) => state.movies.list);
  const moviesFilter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  //Check entered text from state.movies.filter to be sure it is part of the title of the movie
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(moviesFilter)
  );

  return (
    <>
      <Row className="mb-2">
        <MoviesFilter />
      </Row>
      <Row>
        {filteredMovies.length === 0 ? (
          <Col>There are no movies in the list!</Col>
        ) : (
          <>
            {filteredMovies.map((movie) => (
              <Col key={movie._id} md={3} sm={6} className="mb-2">
                <MovieCard movie={movie} prev="/" />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};