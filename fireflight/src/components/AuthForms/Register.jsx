import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/contextProvider";

import useInput from "../../utils/useInput";
import styled from "styled-components";

import fire from "../../config/fire";

function Register({ toggle, setShowAuthForms }) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [firstName, setFirstName, handleFirstName] = useInput("", "firstName");
  const [lastName, setLastName, handleLastName] = useInput("", "lastName");
  const [email, setEmail, handleEmail] = useInput("", "email");
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

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log("Firebase user object: ", user);
        if (password === passwordConf) {
          const UID = user.user.uid;
          const first_name = firstName;
          const last_name = lastName;
          const newUser = { first_name, last_name, email, UID };

          data.state.remote
            .register(newUser)
            .then(res => {
              setFirstName("");
              setLastName("");
              setEmail("");
              setPassword("");
              setPasswordConf("");
              setLoading(false);
              setShowAuthForms(false);
            })
            .catch(err => {
              // BACKEND REGISTER ENDPOINT
              console.log(
                "front end error response from backend register endpoint:",
                err.response.data
              );
              setErrorStatus(true);
              setErrorText(err.response.data);
              setLoading(false);
            });
        } else {
          // IF PASSWORDS DON'T MATCH
          setErrorStatus(true);
          setErrorText({ password: "Passwords must match" });
          setLoading(false);
        }
      })
      .catch(err => {
        // FIREBASE
        console.log(err);
        setErrorStatus(true);
        setErrorText(err); // setting error text to be equal to Firebase error response
        setLoading(false);
      });
  }

  if (data.token != null) {
    console.log(localStorage.getItem("token"));
    return <Redirect to="/" />;
  } else {
    return (
      <div className="login-page-container register-page-container">
        <button
          className="form-close-btn"
          onClick={() => setShowAuthForms(false)}
        >
          x
        </button>
        <h2 className="form-heading">Create an Account</h2>
        <div
          className="fb-login-button"
          data-width="150px"
          data-size="medium"
          data-button-type="login_with"
          data-auto-logout-link="true"
          data-use-continue-as="false"
        />
        <form className="auth-form-container" onSubmit={handleSubmit}>
          <div className="input-containers">
            <label htmlFor="firstName">First Name</label>
            <input
              className="form-input"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleFirstName}
              placeholder=""
            />
            <br></br>
            <label htmlFor="lastName">Last Name</label>
            <input
              className="form-input"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleLastName}
              placeholder=""
            />
            <br></br>
            <label htmlFor="email">Email Address</label>
            <input
              className="form-input"
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder=""
            />
            <br></br>
            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={password}
              // onChange={e=>setPassword(e.value)}
              onChange={handlePassword}
              placeholder=""
            />
            {errorStatus ? (
              <ErrorText>{errorText.password}</ErrorText>
            ) : (
              <ErrorText />
            )}
            <label htmlFor="password">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              name="passwordConf"
              value={passwordConf}
              // onChange={e=>setPasswordConf(e.value)}
              onChange={handlePasswordConf}
              placeholder=""
            />
            {errorStatus ? (
              <ErrorText>{errorText.password}</ErrorText>
            ) : (
              <ErrorText />
            )}
            {/* ERRORS FOR NON-PASSWORD FIELDS */}
            {errorStatus ? (
              <ErrorText>{errorText.message}</ErrorText>
            ) : (
              <ErrorText />
            )}
            <button
              className="auth-btn register-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
          </div>
        </form>
        <p>
          Already have an account?
          <button className="create-an-account" onClick={toggle}>
            Sign In Here
          </button>
        </p>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Register;

const ErrorText = styled.p`
  color: darkred;
  font-size: 0.75em;
  margin: 0px;
  padding: 2px;
  height: 15px;
`;
