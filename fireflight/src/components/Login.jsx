import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import useInput from "../utils/useInput";
//not sure if we are using redux or hooks with context, so taking my best guess...

function Login() {
  const [username, setUsername, handleUsername] = useInput("username", "");
  const [password, setPassword, handlePassword] = useInput("password", "");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
  }

  //   //need this from backend
  const url = "";
  const credentials = { username, password };

  axios
    .post(url, credentials)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      setUsername("");
      setPassword("");
      setLoading(false)
      return <Redirect to="/" />;
    })
    .catch(err => {
      setLoading(false)
      console.log(err);
    });
  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        Login Page!
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsername}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>
        <p>
          Not a member? Sign up <Link to="/register">here</Link>
        </p>
      </div>
    );
  }
}

export default Login;