import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Tooltip, OverlayTrigger, Offcanvas } from "react-bootstrap";

import { useParams } from "react-router";
import { Link } from "react-router";

const DB_FAVORITES_URI = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/movies/favorites/";

// Image imports - Matinee images created using www.recraft.ai and are owned by Recraft.
import matineeFilmReel from "../../img/matinee-film-reel-t.png";

//Increase to 1px to add debug borders
const debugBorder = "0px solid blue";

export const MovieView = ({ prev }) => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  console.log("movie-view.jsx|||user object from redux:", user);

  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState((user.FavoriteMovies).includes(movieId));
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  //Find movie to display
  const movie = movies.find((foundMovie) => foundMovie._id === movieId);

  //Find similar movies array
  const similarMovieArray = movies.filter((arrayMovie) => (movie.Genre.Name === arrayMovie.Genre.Name && movieId !== arrayMovie._id)) || [];

  //Function to render genre Tooltips
  const renderTooltip = (tooltipData) => (
    <Tooltip className="custom-tooltip" >
      {tooltipData}
    </Tooltip >
  );

  const handleHideOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  function formatDirectorInfo(director) {
    return (
      <>
        <h4>{director.Name} ({director.BirthYear} - {director.DeathYear ? director.DeathYear : ""})</h4>
        <hr />
        <h4>Biography:</h4>
        {director.Bio.split('|').map((paragraph) => (
          <p>
            {paragraph}
          </p>
        ))}
        <hr />
        <h4>Other Movies:</h4>
        {director.Movies.map((mov) => (
          <>
            <span>{mov}</span><br />
          </>
        ))}
      </>
    );

  }

  //Handles API call to add favorite movie to user.FavoriteMovies
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
        dispatch(setUser(responseData));
        setIsFavorite(true);
      } else {
        alert("Something went wrong trying to add favorite, please try again.");
      }
    } catch (e) {
      console.error("movie-view.jsx|handleAddFav()|ERROR during add handler:", e);
    }
  };

  //Handles API call to remove favorite movie to user.FavoriteMovies
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
        dispatch(setUser(responseData));
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
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip(movie.Genre.Description)}
            >
              <span> {movie.Genre.Name} (<u>More info</u>)</span>
            </OverlayTrigger>
          </div>

          <div>
            <span className="movie-view-info-field">Director:</span>
            <span onClick={handleShowOffcanvas} style={{ cursor: "pointer" }}> {movie.Director.Name} (<u>Click for more info</u>)</span>
            <Offcanvas show={showOffcanvas} onHide={handleHideOffcanvas}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>More About the Director...</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {formatDirectorInfo(movie.Director)}
              </Offcanvas.Body>
            </Offcanvas>
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

      <Row>
        <Col>
          <div className="d-flex justify-content-center mt-3" style={{ border: debugBorder }}>
            <img src={matineeFilmReel} width="auto" height="auto" />
          </div>
        </Col>
      </Row>

      {similarMovieArray.length !== 0 ? ( //Similar movies found
        <>
          <Row className="justify-content-center mt-3" style={{ border: debugBorder }}>

            <h4>Similar Movies:</h4>
            <hr />
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

//PropTypes for MovieView component holds previous path ("/" or "/profile")
MovieView.propTypes = {
  prev: PropTypes.string.isRequired
};