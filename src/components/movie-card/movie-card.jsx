import { PropTypes } from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 text-center" onClick={() => { onMovieClick(movie) }}>
      <Card.Img variant="top" src={movie.ImageURL} />
      <Card.Body>
        <Card.Title >{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

//PropTypes for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImageURL: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};