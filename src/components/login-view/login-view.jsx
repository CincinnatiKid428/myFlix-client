import { PropTypes } from "prop-types";
import { useState, useContext } from "react";
//import { AppContext } from "../app-context/app-context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LOGIN_URL = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/login";

export const LoginView = ({ onLoggedIn }) => { // Use context vs props?
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Handler for form submit
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    console.log("login-view.jsx | Starting handleLoginSubmit()");

    const loginData = {
      Username: username,
      Password: password,
    };

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("login-view.jsx | Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
        console.log("login-view.jsx | Something went wrong :", e);
      });
  };

  return (
    <Form onSubmit={handleLoginSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Log in
      </Button>
    </Form>
  );
};

// If we use context, won't need propTypes?

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
