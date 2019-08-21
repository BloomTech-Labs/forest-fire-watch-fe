import React, { useState, useContext, useEffect } from "react";
import FireContext from "../context/contextProvider";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import useInput from "../utils/useInput";
//not sure if we are using redux or hooks with context, so taking my best guess...

function Login() {
  const [username, setUsername, handleUsername] = useInput("", "username");
  const [password, setPassword, handlePassword] = useInput("", "password");

  // Shannon: useInput is a custom hook specifically to handle input fields
  //proper way. [getter,setter] = useState(default)
  // const [username,setUsername] = useState("")
  // const [password,setPassword] = useState("")

  //get global context (think redux store)
  const context = useContext(FireContext);

  const [loading, setLoading] = useState(false);

  //view context once / example of how to use
  useEffect(() => {
    console.log(context);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const credentials = { username, password };

    axios
      .post(
        "https://fireflight-lambda.herokuapp.com/api/auth/login",
        credentials
      )
      .then(res => {
        localStorage.setItem("token", res.data.token);
        //set global context token
        context.setToken(res.data.token);
        //end
        setUsername("");
        setPassword("");
        setLoading(false);
        return <Redirect to="/" />;
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }
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
