import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Handler for form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://fast-taiga-09096-54ce00eca848.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login Failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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