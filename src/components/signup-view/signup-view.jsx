import { useState } from "react";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";

const SIGNUP_URL = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/users";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();
  const log = logIt;

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const signupData = {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthday,
    };

    log(LOG_LEVEL_DEBUG, "signup-view.jsx|Attempting signup with data:", signupData);

    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Sign up successful, you can now log in.");
          log(LOG_LEVEL_INFO, "signup-view.jsx|Successful account signup user:", signupData.Username);
          navigate("/login"); //Hook to navigate back to /login
        } else {
          alert("Sign up failed, please try again.");
        }
      })
      .catch((e) => {
        log(LOG_LEVEL_ERROR, "signup-view.jsx|Error during sign up submit : ", e);
      });
  };

  return (
    <Form onSubmit={handleSignupSubmit}>
      <Form.Group controlId="formSignupUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formSignupPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </Form.Group>

      <Form.Group controlId="formSignupEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSignupBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-2 mb-5">
        Sign Up
      </Button>
    </Form>
  );
};
