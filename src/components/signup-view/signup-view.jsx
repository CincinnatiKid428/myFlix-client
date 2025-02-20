import { useState } from "react";
const SIGNUP_URL = "https://fast-taiga-09096-54ce00eca848.herokuapp.com/users";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    console.log("signup-view.jsx | Starting handleSignupSubmit()");

    signupData = {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthday,
    };

    console.log("signup-view.jsx | Attempting signup with data:", signupData);

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
          window.location.reload();
        } else {
          alert("Sign up failed, please try again.");
        }
      })
      .catch((e) => {
        console.error("signup-view.jsx | Error during sign up submit : ", e);
      });
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="6"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
};
