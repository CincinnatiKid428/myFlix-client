import { PropTypes } from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`} >
      <Card className="h-100 text-center">
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title >{movie.Title}</Card.Title>
        </Card.Body>
      </Card>
    </Link >
  );
};

//PropTypes for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired
  }).isRequired
};