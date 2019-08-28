import React from "react";
import styled from "styled-components";

const RegisterSplit = ({ toggle }) => {
  return (
    <RegisterSplitWrapper>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    border-radius: 0px 0px 25px 25px;
  }
`;

const Heading = styled.h2`
  margin-top: 0px;
  @media (max-width: 900px) {
    margin-top: 15px;
  }
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
