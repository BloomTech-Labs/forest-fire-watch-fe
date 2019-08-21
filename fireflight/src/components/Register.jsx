import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import FireContext from "../context/contextProvider";
import axios from "axios";

import useInput from "../utils/useInput";

function Register() {
  //useInput is a custom hook that should be used for all controlled inputs
  const [username, setUsername, handleUsername] = useInput("", "username");
  const [password, setPassword, handlePassword] = useInput("", "password");
  //second password input used to ensure no typos in passwords
  const [passwordConf, setPasswordConf, handlePasswordConf] = useInput(
    "",
    "passwordConf"
  );
  const [loading, setLoading] = useState(false);
  const [badPassword, setBadPassword] = useState(false);

  const data = useContext(FireContext);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (password === passwordConf) {
      const newUser = { username, password };
      axios
        .post(
          "https://fireflight-lambda.herokuapp.com/api/auth/register",
          newUser
        )
        .then(res => {
          setUsername("");
          setPassword("");
          setPasswordConf("");
          setLoading(false);
          console.log(res);
          return <Redirect to="/login" />;
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setBadPassword(true);
    }
  }

  if (data.token != null) {
    console.log(localStorage.getItem("token"));
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        Registration Page!
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={username}
              // onChange={e=>setUsername(e.value)}
              onChange={handleUsername}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              // onChange={e=>setPassword(e.value)}
              onChange={handlePassword}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConf"
              value={passwordConf}
              // onChange={e=>setPasswordConf(e.value)}
              onChange={handlePasswordConf}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
          {badPassword ? <p>"Your passwords don't match"</p> : <></>}
        </form>
        <p>
          Already a member? Log in <Link to="/login">here</Link>
        </p>
      </div>
    );
  }
}

export default Register;
