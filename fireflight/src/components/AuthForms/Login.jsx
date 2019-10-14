import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/contextProvider";
import useInput from "../../utils/useInput";
import styled from "styled-components";
//not sure if we are using redux or hooks with context, so taking my best guess...
import LoginSplit from "./LoginSplit";

function Login({ toggle, setShowAuthForms }) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [email, setEmail, handleEmail] = useInput("", "email");
  const [password, setPassword, handlePassword] = useInput("", "password");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorText, setErrorText] = useState({});
  //get global context (think redux store)
  const context = useContext(GlobalContext);

  //view context once / example of how to use
  useEffect(() => {
    console.log(context);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const credentials = { email, password };

    setErrorStatus(false);
    setErrorText("");

    context.state.remote
      .login(credentials)
      .then(res => {
        setEmail("");
        setPassword("");
        setLoading(false);
        setShowAuthForms(false);
      })
      .catch(err => {
        setErrorText("Email or Password Invalid");
        setErrorStatus(true);
        setLoading(false);
      });
  }

  return (
    <div className="login-page-container">
      <h2 className="form-heading">Welcome Back</h2>
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email Address
          {/* <i className="fas fa-user-circle fa-lg" /> */}
          <input
            className="form-input"
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder=""
          />
        </label>
        {errorStatus ? (
          <span className="name-error-text">{errorText}</span>
        ) : (
          <span className="user-error-text" />
        )}
        <br />
        <label htmlFor="password">
          {/* <i className="fas fa-key fa-lg" /> */}
          Password
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder=""
          />
        </label>
        <p>
          {" "}
          Need to create an account?
          <a className="create-an-account" href="#">
            Sign up Here
          </a>
        </p>
        <p>
          <a className="forgot-pw" href="#">
            Forgot your Password?
          </a>
        </p>
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      {/* Remove Registration split */}
      {/* <LoginSplitContainer>
        <LoginSplit toggle={toggle} />
      </LoginSplitContainer> */}
    </div>
  );
  // }
}

export default Login;
