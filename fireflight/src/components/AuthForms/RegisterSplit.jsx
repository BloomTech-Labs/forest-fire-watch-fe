import React from "react";
import styled from "styled-components";

const RegisterSplit = () => {
  return (
    <RegisterSplitWrapper>
      <Heading>Welcome Back!</Heading>
      <Text>To keep conneted with us please login with your personal info</Text>
      <Button>Sign In</Button>
    </RegisterSplitWrapper>
  );
};

export default RegisterSplit;

const RegisterSplitWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #355c7d;
  border-radius: 25px 0px 0px 25px;
  color: white;
`;

const Heading = styled.h2`
  padding-top: 50%;
  margin-top: 0px;
`;

const Text = styled.p`
  width: 75%;
  margin: auto;
`;

const Button = styled.button`
  width: 60%;
  margin: 25px auto;
  background: none;
  border-color: white;
  border-radius: 25px;
  padding: 10px;
  color: white;
`;
