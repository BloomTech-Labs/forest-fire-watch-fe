import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/contextProvider";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import useInput from "../../utils/useInput";
import styled from "styled-components";
//not sure if we are using redux or hooks with context, so taking my best guess...
import logo from "../../images/FF-logo.png";
import LoginSplit from "./LoginSplit";

const deployedURL = "https://fireflight-lambda.herokuapp.com/api/auth";
const localURL = "http://localhost:5000/api/auth";

function Login({ toggle, setShowAuthForms }) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [username, setUsername, handleUsername] = useInput("", "username");
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
    const credentials = { username, password };

    setErrorStatus(false);
    setErrorText("");

    context.state.remote
      .login(credentials)
      .then(res => {
        setUsername("");
        setPassword("");
        setLoading(false);
        setShowAuthForms(false);
      })
      .catch(err => {
        setErrorText("Username or Password Invalid");
        setErrorStatus(true);
        setLoading(false);
      });
  }

  return (
    <LoginPageContainer>
      <LoginContainer>
        <img src={logo} alt="FireFlight" />
        <h2 className="form-heading">Welcome Back!</h2>
        <p className="form-text">Sign in to continue</p>
        <FormContainer onSubmit={handleSubmit}>
          <i className="fas fa-user-circle fa-lg" />
          <input
            className="form-input"
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            placeholder="Username"
          />
          {errorStatus ? <ErrorText>{errorText}</ErrorText> : <ErrorText />}

          <i className="fas fa-key fa-lg" />
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          <p><a className="forgot-pw" href='#'>Forgot your Password?</a></p>
          {errorStatus ? (
            <ErrorText>{errorText.password}</ErrorText>
          ) : (
            <ErrorText />
          )}
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </FormContainer>
      </LoginContainer>
      <LoginSplitContainer>
        <LoginSplit toggle={toggle} />
      </LoginSplitContainer>
    </LoginPageContainer>
  );
  // }
}

export default Login;

const LoginPageContainer = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  display: flex;
  min-height: 500px;
  background-image: linear-gradient(
    #f8b195,
    #f67280,
    #c06c84,
    #6c5b7b,
    #355c7d
  );
  border-radius: 8px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LoginContainer = styled.div`
  width: 60%;
  height: auto;
  margin: auto;

  @media (max-width: 900px) {
    width: 90%;
  }
`;

const LoginSplitContainer = styled.div`
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.p`
  color: darkred;
  font-size: 0.75em;
  margin: 0px;
  padding: 2px;
  height: 15px;
`;
