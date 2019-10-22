import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/contextProvider";
import useInput from "../../utils/useInput";
import { Link } from "react-router-dom";

import fire from '../../config/fire';

function Login({ 
  toggle, 
  setShowAuthForms, 
  setRegisterStatus,
  setLoginStatus,
  setPasswordFormStatus,
  toggleForgotPassword
}) {
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

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        const UID = user.user.uid;
        const credentials = { UID };

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
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="login-page-container">
      <button
        className="form-close-btn"
        onClick={() => setShowAuthForms(false)}
      >
        x
      </button>
      <h2 className="form-heading">Welcome Back</h2>
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <div className="input-containers">
          <label htmlFor="email">Email Address</label>
          <input
            className="form-input"
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder=""
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder=""
          />
          {errorStatus ? (
            <span className="name-error-text">{errorText}</span>
          ) : (
            <span className="user-error-text" />
          )}
          <br />
          <span className="forgot-pw">
            <button
              onClick={() => {
                setPasswordFormStatus(true);
                setLoginStatus(false);
              }}>
              Forgot your Password?
            </button>
          </span>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <p className="modal-crosslink">
          Need to create an account?
          <button 
            className="create-an-account"
            onClick={ toggle }
          >
            Sign up Here
          </button>
        </p>
        <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}

export default Login;
