import React from "react";
import styled from "styled-components";

const LoginSplit = ({ toggle }) => {
  return (
    <LoginSplitWrapper>
      <div>
        {/* <Heading>Hello Friend!</Heading> */}
        <Text>Enter your personal details and start the journey with us</Text>
        <Button onClick={() => toggle()}>Sign Up</Button>
      </div>
    </LoginSplitWrapper>
  );
};

export default LoginSplit;

const LoginSplitWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #6c5b7b, #355c7d);
  border-radius: 0px 25px 25px 0px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// const Heading = styled.h2`
//   margin-top: 0px;
// `;

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
