import { PropTypes } from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UpdateUser } from "./update-user";

//Image imports - Matinee images created using www.recraft.ai and are owned by Recraft.
import matinee4Transparent from "../../img/matinee4-transparent.png";


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

export const ProfileView = ({ user, token, UpdateMainViewUser }) => {

  return (
    <>
      <Row className="justify-content-center mt-2" style={{ border: debugBorder }}>
        <Col sm={10} md={6} style={{ border: debugBorder }}>
          <div className="align-self-center ps-2" style={{ backgroundColor: "#ffffff" }}>
            <p>Username : {user.Username}</p>
            <p>Email : {user.Email}</p>
            <p>Birthdate : {formatUserBday(user.Birthdate)}</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3" style={{ border: debugBorder }}>
        <Col sm={10} md={6} className="align-self-center" style={{ border: debugBorder }}>
          <UpdateUser user={user} token={token} onUpdatedUser={(updatedUser) => {
            UpdateMainViewUser(updatedUser);
          }} />
        </Col>
      </Row >
      <Row style={{ border: debugBorder }}>
        <Col className="d-flex justify-content-center">
          <img src={matinee4Transparent} className="img-rounded-corners" alt="Image created using www.recraft.ai and is owned by Recraft." />
        </Col>
      </Row>

    </>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }).isRequired,
  token: PropTypes.string.isRequired,
  UpdateMainViewUser: PropTypes.func.isRequired
}