import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/contextProvider";
import axios from "axios";

import useInput from "../../utils/useInput";
import styled from "styled-components";

import RegisterSplit from "./RegisterSplit";

const deployedURL = "https://fireflight-lambda.herokuapp.com/api/auth";
const localURL = "http://localhost:5000/api/auth";

function Register({ toggle, setShowAuthForms }) {
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

  const data = useContext(GlobalContext);

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
          setShowAuthForms(false);
        })
        .catch(err => {
          console.log(err);
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
              {loading ? "Loading..." : "Sign Up"}
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
  background-image: linear-gradient(
    #f8b195,
    #f67280,
    #c06c84,
    #6c5b7b,
    #355c7d
  );
  border-radius: 25px;
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

const FormHeading = styled.h2`
  margin-bottom: 25px;
  color: #f2f3f4;
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
  background-color: #355c7d;
  color: #f2f3f4;
  border-radius: 5px;
  border: none;
  &::placeholder {
    color: #f2f3f4;
    opacity: 0.75;
  }
  @media (max-width: 900px) {
    width: 75%;
  }
`;

const Button = styled.button`
  width: 200px;
  margin: 20px auto;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #f2f3f4;
  color: #355c7d;
  font-size: 1em;
  box-shadow: 1px 2px 5px black;
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
