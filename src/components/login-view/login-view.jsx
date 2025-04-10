import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import { setMovies } from "../../redux/reducers/movies";
import { useDispatch } from "react-redux";
import logIt, { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG } from "../../util/log-it";

const ENABLE_DATA_CLEAR = false; //Set true to enable button to clear stored states/localStorage
const LOGIN_URL = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/login";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const log = logIt;

  const onLoggedIn = (user, token) => {
    dispatch(setUser(user));
    dispatch(setToken(token));
  };

  const onLoggedOut = () => {
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setMovies([]));
    log(LOG_LEVEL_DEBUG, "DEBUG BUTTON|login-view.jsx|...cleared localStorage and user/token/movies");
  };

  //Handler for form submit
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    log(LOG_LEVEL_DEBUG, "login-view.jsx | Starting handleLoginSubmit()");

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
        log(LOG_LEVEL_DEBUG, "login-view.jsx | Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          log(LOG_LEVEL_DEBUG, "login-view.jsx|Login successful.");
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
        log(LOG_LEVEL_ERROR, "login-view.jsx | Error during authentication :", e);

        log(LOG_LEVEL_ERROR, "login-view.jsx | Cleanup - clearing localStorage...");
        localStorage.clear();
        log(LOG_LEVEL_ERROR, "login-view.jsx | dispatch(setUser(null))...");
        dispatch(setUser(null));
        log(LOG_LEVEL_ERROR, "login-view.jsx | dispatch(setToken(null))...");
        dispatch(setToken(null));
      });
  };

  //Check for persistent login with local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    //Update state if we have valid stored user/token
    if (storedUser && storedToken) {
      log(LOG_LEVEL_DEBUG, "login-view.jsx|localStorage user & token found");
      onLoggedIn(storedUser, storedToken);
    }
  }, []); //Empty dependency array ensures this runs only once after the initial render

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
      {ENABLE_DATA_CLEAR &&
        <Button variant="danger" type="button" className="mt-2 ml-2" onClick={onLoggedOut}>Clear Data</Button>
      }
    </Form>
  );
};
