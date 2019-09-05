import React from "react";
import styled from "styled-components";

const LoginSplit = ({ toggle }) => {
  return (
    <LoginSplitWrapper>
      <div>
        <Heading>Make plans now for the wildfire season</Heading>
        <Text>Take control of you and your families well-being</Text>
        <Button onClick={() => toggle()}>Create Account</Button>
      </div>
    </LoginSplitWrapper>
  );
};

export default LoginSplit;

const LoginSplitWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #6c5b7b, #355c7d);
  border-radius: 0px 8px 8px 0px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    border-radius: 0px 0px 25px 25px;
  }
`;

const Heading = styled.h3`
  margin: 0px auto auto;
  width: 75%;
  text-align: left;
  line-height: 30px;
  @media (max-width: 900px) {
    margin-top: 15px;
  }
`;

const Text = styled.p`
  width: 75%;
  text-align: left;
  margin: auto;
  padding-top: 10px;
  line-height: 20px;
  font-weight: 300;
  font-size: 0.8rem;
`;

const Button = styled.button`
  width: 50%;
  margin: 25px auto;
  background: none;
  border-color: #f2f3f4;
  border-radius: 5px;
  padding: 10px;
  color: #f2f3f4;
  font-size: 1em;
`;
