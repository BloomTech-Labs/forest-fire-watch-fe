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
      <FormContainer onSubmit={handleSubmit}>
        <FormLabel>
          Username
          <FormInput
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </FormLabel>
        <FormLabel>
          Password
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </FormLabel>
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
