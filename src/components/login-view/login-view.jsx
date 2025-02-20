import React from "react";
import { useState } from "react";

const LOGIN_URL = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/login";

export const LoginView = ({ onLoggedIn }) => {
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
          console.log("login-view.jsx | Setting localStorage (data & token)... onLoggedIn() called...");
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
    <form onSubmit={handleLoginSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={5}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};
