import { PropTypes } from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { UpdateUser } from "./update-user";
import { FavoriteMoviesView } from "./favorite-movies-view";

//Image imports - Matinee images created using www.recraft.ai and are owned by Recraft.
import matinee4Transparent from "../../img/matinee4-transparent.png";

const DELETE_USER_URL = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/users";

//Increase to 1px to add debug borders
const debugBorder = "0px solid blue";

/**
 * Function will convert standard date format into simple MM/DD/YYYY string
 * @param {string} bday - Standard date format
 * @returns {string} Date in MM/DD/YYY format
 */
function formatUserBday(bday) {
  let bdaySlice = bday.slice(0, 10);
  let dateParts = bdaySlice.split("-");

  if (dateParts.length !== 3)
    return "Invalid date";
  else
    return dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0];
}

export const ProfileView = ({ user, setUser, movies, token, onLoggedOut }) => {
  console.log("profile-view.jsx | Starting");

  //Handles account removal with user confirmation required before DELETE call
  const handleDeleteAcct = () => {

    const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone. Click OK to delete your account.");

    if (confirmDelete) {
      fetch((DELETE_USER_URL), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.ok) {
            alert("Account removal successful");
            console.log(`profile-view.jsx|handleDeleteAcct() | Successful delete, removed user ${user.Username}`, response);
            onLoggedOut(); //Logout and clear all the local storage & state variables
          } else {
            alert("Delete failed, please try again.");
          }
        })
        .catch((e) => {
          console.error("profile-view.jsx|handleDeleteAcct()  | Error during delete submit : ", e);
        });
    } else alert("Your account was not removed.");

  };

  return (
    <>
      <Row className="d-flex justify-content-center mt-2" style={{ border: debugBorder }}>
        <Col sm={10} md={6} style={{ border: debugBorder }}>
          <div className="align-self-center ps-2" style={{ backgroundColor: "#ffffff" }}>
            <p>Username : {user.Username}</p>
            <p>Email : {user.Email}</p>
            <p>Birthdate : {formatUserBday(user.Birthdate)}</p>
          </div>
        </Col>

        <div className="d-flex justify-content-center">
          <Button variant="danger" type="button" className="mb-5" onClick={() => handleDeleteAcct()}>
            Delete Account
          </Button>
        </div>
      </Row>

      <Row className="d-flex justify-content-center" style={{ border: debugBorder }}>
        <Col sm={10} md={6} className="align-self-center" style={{ border: debugBorder }}>
          <UpdateUser user={user} token={token} onUpdatedUser={(updatedUser) => {
            setUser(updatedUser);
          }} />
        </Col>
      </Row >

      <Row style={{ border: debugBorder }}>
        <Col className="d-flex justify-content-center">
          <img src={matinee4Transparent} className="img-rounded-corners" alt="Image created using www.recraft.ai and is owned by Recraft." />
        </Col>
      </Row>

      <h5>{user.Username}'s Favorite Movies:</h5>
      <hr />
      {user.FavoriteMovies.length !== 0 ? (
        <>
          <Row>
            <FavoriteMoviesView user={user} setUser={setUser} movies={movies} token={token} favoritesIdArray={user.FavoriteMovies} />
          </Row>
        </>
      ) : (
        <p>No movies added to favorites</p>
      )}
    </>
  );
};

ProfileView.propTypes = {

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
  onLoggedOut: PropTypes.func.isRequired
}