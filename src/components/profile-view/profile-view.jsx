import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { UpdateUser } from "./update-user";
import { FavoriteMoviesView } from "./favorite-movies-view";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";

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

export const ProfileView = () => {

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();
  const log = logIt;

  log(LOG_LEVEL_DEBUG, "profile-view.jsx | Starting");

  const onLoggedOut = () => {
    log(LOG_LEVEL_DEBUG, "profile-view.jsx|Logging user out, clearing localStorage...");
    localStorage.clear();
    log(LOG_LEVEL_DEBUG, "profile-view.jsx|dispatch(setUser(null))...");
    dispatch(setUser(null));
    log(LOG_LEVEL_DEBUG, "profile-view.jsx|dispatch(setToken(null))...");
    dispatch(setToken(null));
    log(LOG_LEVEL_DEBUG, "profile-view.jsx|Logout complete.");
  };

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
            log(LOG_LEVEL_INFO, `profile-view.jsx|handleDeleteAcct()|Successful delete, removed user ${user.Username}`, response);
            onLoggedOut(); //Logout user and clear all the local storage & state variables
          } else {
            alert("Delete failed, please try again.");
          }
        })
        .catch((e) => {
          (LOG_LEVEL_ERROR, "profile-view.jsx|handleDeleteAcct()|Error during delete submit : ", e);
        });
    } else alert("Your account was not removed.");

  };

  return (
    <>
      {window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
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
          <UpdateUser />
        </Col>
      </Row >

      <Row style={{ border: debugBorder }}>
        <Col className="d-flex justify-content-center">
          <img src={matinee4Transparent} className="img-rounded-corners" alt="Image created using www.recraft.ai and is owned by Recraft." />
        </Col>
      </Row>

      <Row>
        <FavoriteMoviesView user={user} setUser={setUser} movies={movies} token={token} favoritesIdArray={user.FavoriteMovies} />
      </Row>
    </>
  );
};