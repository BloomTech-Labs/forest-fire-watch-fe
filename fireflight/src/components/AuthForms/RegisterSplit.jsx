import React from "react";
import styled from "styled-components";

const RegisterSplit = ({ toggle }) => {
  return (
    <RegisterSplitWrapper>

      <Heading>Welcome Back!</Heading>
      <Text>To keep conneted with us please login with your personal info</Text>
      <Button onClick={() => toggle()}>Sign In</Button>

      <div>
        <Heading>Welcome Back!</Heading>
        <Text>
          To keep conneted with us please login with your personal info
        </Text>
        <Button onClick={() => toggle()}>Sign In</Button>
      </div>

    </RegisterSplitWrapper>
  );
};

export default RegisterSplit;

const RegisterSplitWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #6c5b7b, #355c7d);
  border-radius: 25px 0px 0px 25px;
  color: white;

`;

const Heading = styled.h2`
  padding-top: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h2`

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
