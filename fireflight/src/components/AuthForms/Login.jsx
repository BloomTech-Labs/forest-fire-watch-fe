import React, { useState, useContext, useEffect } from "react";
import { FireContext } from "../../context/contextProvider";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import useInput from "../../utils/useInput";
import styled from "styled-components";
//not sure if we are using redux or hooks with context, so taking my best guess...

import LoginSplit from "./LoginSplit";

const deployedURL = "https://fireflight-lambda.herokuapp.com/api/auth";
const localURL = "http://localhost:5000/api/auth";

function Login({ toggle }) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [username, setUsername, handleUsername] = useInput("", "username");
  const [password, setPassword, handlePassword] = useInput("", "password");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorText, setErrorText] = useState({});
  //get global context (think redux store)
  const context = useContext(FireContext);

  //view context once / example of how to use
  useEffect(() => {
    console.log(context);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const credentials = { username, password };

    setErrorStatus(false)
    setErrorText("")

    context.state.remote.login(credentials)
      .then(res => {
        setUsername("");
        setPassword("");
        setLoading(false);
        return <Redirect to="/" />;
      })
      .catch(err => {
        setErrorText("Username or Password Invalid");
        setErrorStatus(true);
        setLoading(false);
      });
  }
  // if (localStorage.getItem("token")) {
  //   return <Redirect to="/" />;
  // } else {
  return (
    <LoginPageContainer>
      <LoginContainer>
        <FormHeading>Login</FormHeading>
        <FormContainer onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            placeholder="Username"
          />
          {errorStatus ? (
            <ErrorText>{errorText}</ErrorText>
          ) : (
            <ErrorText />
          )}

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="password"
          />
          {errorStatus ? (
            <ErrorText>{errorText.password}</ErrorText>
          ) : (
            <ErrorText />
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Log In"}
          </Button>
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
  width: 40%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormHeading = styled.h1`
  margin-bottom: 25px;
  color: #355c7d;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  width: 300px;
  margin: auto;
  padding: 15px;
  font-size: 0.75em;
  background-color: #e6e6e6;
  border-radius: 5px;
  border: none;
  @media (max-width: 900px) {
    width: 75%;
  }
`;

const Button = styled.button`
  width: 200px;
  margin: 20px auto;
  padding: 10px 15px;
  border-radius: 55px;
  border: none;
  background-color: #c06c84;
  color: #f2f2f2;
  font-size: 1em;
  @media (max-width: 900px) {
    width: 50%;
  }
`;

const ErrorText = styled.p`
  color: darkred;
  font-size: 0.75em;
  margin: 0px;
  padding: 2px;
  height: 15px;
`;
