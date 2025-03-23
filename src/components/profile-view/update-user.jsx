import { PropTypes } from "prop-types";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
const UPDATE_USER_URL = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/users";

//Use 1px to add debug borders with style="border: {debugBorder}" element attrib
const debugBorder = "0px solid purple";

export const UpdateUser = ({ user, token, onUpdatedUser }) => {

  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const navigate = useNavigate();

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    console.log("update-user.jsx | Starting handleUpdateSubmit()");

    updateData = {
      Password: newPassword,
      Email: newEmail,
      Birthdate: newBirthday,
    };

    console.log("update-user.jsx | Attempting update with data:", updateData);
    console.log("update-user.jsx | API call to:", (UPDATE_USER_URL + `/${user.Username}`));

    try {
      const apiResponse = await fetch((UPDATE_USER_URL + `/${user.Username}`), {
        method: "PUT",
        body: JSON.stringify(updateData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const apiResponseJSON = await apiResponse.json();
      if (apiResponseJSON) {
        alert("Update successful.");
        console.log("update-user.jsx | Successful update, the response user object is: ", apiResponseJSON);
        onUpdatedUser(apiResponseJSON); //Pass this function the new user object
        navigate("/profile"); //Hook to navigate back to /profile
      } else {
        alert("Update failed, please try again.");
      }
    } catch (e) {
      console.error("update-user.jsx|Error during update submit : ", e);
    }

  };

  return (
    <>
      <h5>Update Account Information</h5>
      <hr />
      <p>Please fill out <strong>ALL</strong> fields:</p>
      <Form onSubmit={handleUpdateSubmit} style={{ border: debugBorder }}>
        <Form.Group controlId="formUpdatePassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>

        <Form.Group controlId="formUpdateEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder={user.Email}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUpdateBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={newBirthday}
            onChange={(e) => setNewBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="mt-2 mb-5">
            Update Info
          </Button>
        </div>
      </Form>
      {/*     </Col>
      </Row>
  */}  </>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }).isRequired,
  token: PropTypes.string.isRequired,
  onUpdatedUser: PropTypes.func.isRequired
}