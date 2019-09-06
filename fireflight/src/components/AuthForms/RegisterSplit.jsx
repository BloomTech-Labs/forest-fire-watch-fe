import React from "react";
import styled from "styled-components";

const RegisterSplit = ({ toggle }) => {
  return (
    <RegisterSplitWrapper>
      <div>
        <Heading>Welcome Back!</Heading>
        <Text>
          To keep conneted with us FireFlight please sign in with your personal
          info
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
  background: linear-gradient(to bottom, #6c5b7b, #355c7d);
  background-img: url(../../images/bonfire.jpg);
  border-radius: 8px 0px 0px 8px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    border-radius: 0px 0px 25px 25px;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;

const Heading = styled.h3`
  margin: 0px auto auto;
  width: 75%;
  text-align: center;
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
  cursor: pointer;
  font-size: 1em;
`;
