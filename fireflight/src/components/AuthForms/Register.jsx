import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { FireContext } from "../../context/contextProvider";
import axios from "axios";

import useInput from "../../utils/useInput";
import styled from "styled-components";

import RegisterSplit from "./RegisterSplit";

const deployedURL = "https://fireflight-lambda.herokuapp.com/api/auth";
const localURL = "http://localhost:5000/api/auth";

function Register({ toggle }) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [username, setUsername, handleUsername] = useInput("", "username");
  const [password, setPassword, handlePassword] = useInput("", "password");
  //second password input used to ensure no typos in passwords
  const [passwordConf, setPasswordConf, handlePasswordConf] = useInput(
    "",
    "passwordConf"
  );
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorText, setErrorText] = useState({});

  const data = useContext(FireContext);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // ERROR HANDLING EXPLANATION
    // We first check if password and passwordConf match. We do this on the front end because the passwordConf does not get passed to the backend to check it.
    // The user credentials are then validated on the backend, if they are invalid, the server returns a 400 status code that triggers the catch method in the api call.
    // The errorStatus hook is set to true so that we can check if errors exist.
    // The errorText is set to the error descriptions that are coming from the server.
    // We then display those error descriptions below in some p tags.

    if (password === passwordConf) {
      const newUser = { username, password };
      data.state.remote
        .register(newUser)
        .then(res => {
          setUsername("");
          setPassword("");
          setPasswordConf("");
          setLoading(false);
          // return <Redirect to="/login" />;
        })
        .catch(err => {
          console.log(err.response);
          setErrorStatus(true);
          setErrorText(err.response.data);
          setLoading(false);
        });
    } else {
      setErrorStatus(true);
      setErrorText({ password: "Passwords must match" });
      setLoading(false);
    }
  }

  if (data.token != null) {
    console.log(localStorage.getItem("token"));
    return <Redirect to="/" />;
  } else {
    return (
      <RegPageContainer>
        <RegisterSplitContainer>
          <RegisterSplit toggle={toggle} />
        </RegisterSplitContainer>
        <RegisterContainer>
          <FormHeading>Create Account</FormHeading>
          <FormContainer onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="username"
              value={username}
              // onChange={e=>setUsername(e.value)}
              onChange={handleUsername}
              placeholder="Username"
            />
            {errorStatus ? (
              <ErrorText>{errorText.username}</ErrorText>
            ) : (
              <ErrorText />
            )}

            <FormInput
              type="password"
              name="password"
              value={password}
              // onChange={e=>setPassword(e.value)}
              onChange={handlePassword}
              placeholder="Password"
            />
            {errorStatus && password !== passwordConf ? (
              <ErrorText>{errorText.password}</ErrorText>
            ) : (
              <ErrorText />
            )}
            <FormInput
              type="password"
              name="passwordConf"
              value={passwordConf}
              // onChange={e=>setPasswordConf(e.value)}
              onChange={handlePasswordConf}
              placeholder="Confirm Password"
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
          </FormContainer>
        </RegisterContainer>
      </RegPageContainer>
    );
  }
}

export default Register;

const RegPageContainer = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  display: flex;
  min-height: 500px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const RegisterContainer = styled.div`
  width: 60%;
  height: auto;
  margin: auto;
  @media (max-width: 900px) {
    width: 90%;
    order: 1;
  }
`;

const RegisterSplitContainer = styled.div`
  width: 40%;
  @media (max-width: 900px) {
    width: 100%;
    order: 2;
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
