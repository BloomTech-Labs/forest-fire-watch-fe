import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import FireContext from "../context/contextProvider";
import axios from "axios";

import useInput from "../utils/useInput";
import styled from "styled-components";

const deployedURL = "https://fireflight-lambda.herokuapp.com/api/auth";
const localURL = "http://localhost:5000/api/auth";

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
      axios
        .post(`${localURL}/register`, newUser)
        .then(res => {
          setUsername("");
          setPassword("");
          setPasswordConf("");
          setLoading(false);
          // return <Redirect to="/login" />;
        })
        .catch(err => {
          setErrorStatus(true);
          setErrorText(err.response.data);
          setLoading(false);
        });
    } else {
      setErrorStatus(true);
      setErrorText({ password: "Passwords must match" });
    }
  }

  if (data.token != null) {
    console.log(localStorage.getItem("token"));
    return <Redirect to="/" />;
  } else {
    return (
      <RegPageContainer>
        Registration Page!
        <FormContainer onSubmit={handleSubmit}>
          <FormLabel>
            Username
            <FormInput
              type="text"
              name="username"
              value={username}
              // onChange={e=>setUsername(e.value)}
              onChange={handleUsername}
            />
          </FormLabel>
          <FormLabel>
            Password
            <FormInput
              type="password"
              name="password"
              value={password}
              // onChange={e=>setPassword(e.value)}
              onChange={handlePassword}
            />
          </FormLabel>
          <FormLabel>
            Confirm Password
            <FormInput
              type="password"
              name="passwordConf"
              value={passwordConf}
              // onChange={e=>setPasswordConf(e.value)}
              onChange={handlePasswordConf}
            />
          </FormLabel>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
          {errorStatus ? (
            <div>
              <p>{errorText.username}</p>
              <p>{errorText.password}</p>
            </div>
          ) : (
            <></>
          )}
        </FormContainer>
        <p>
          Already a member? Log in <Link to="/login">here</Link>
        </p>
      </RegPageContainer>
    );
  }
}

export default Register;

const RegPageContainer = styled.div`
  width: 75%;
  margin: 50px auto auto;
  padding: 50px 0px;
  text-align: center;
  border: 1px solid black;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  padding: 5px 0px;
`;

const FormInput = styled.input`
  margin-left: 10px;
`;

const Button = styled.button`
  width: 200px;
  box-shadow: 2px 2px 7px black;
  margin: 20px auto;
`;
