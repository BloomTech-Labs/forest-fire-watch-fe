import React, { useState, useContext, useEffect } from "react";
import FireContext from "../../context/contextProvider";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import useInput from "../../utils/useInput";
import styled from "styled-components";
//not sure if we are using redux or hooks with context, so taking my best guess...

function Login() {
  //useInput is a custom hook that should be used for all controlled inputs
  const [username, setUsername, handleUsername] = useInput("", "username");
  const [password, setPassword, handlePassword] = useInput("", "password");
  const [loading, setLoading] = useState(false);
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
  // if (localStorage.getItem("token")) {
  //   return <Redirect to="/" />;
  // } else {
  return (
    <LoginPageContainer>
      <FormHeading>Login</FormHeading>
      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
          placeholder="Username"
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="password"
        />
        <Button
          type="submit"
          disabled={loading}
          onClick={console.log("working")}
        >
          {loading ? "Loading..." : "Log In"}
        </Button>
      </FormContainer>
      <p>
        Not a member? Sign up <Link to="/register">here</Link>
      </p>
    </LoginPageContainer>
  );
  // }
}

export default Login;

const LoginPageContainer = styled.div`
  width: 75%;
  margin: auto;
  text-align: center;
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
  margin: 5px auto;
  padding: 10px;
  font-size: 0.75em;
  background-color: #e6e6e6;
  border-radius: 5px;
  border: none;
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
`;
