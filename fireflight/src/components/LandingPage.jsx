import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import NavBar from './Navigation'

const BodyEl = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  // margin: 100px 0px;
  width: 100%;
  height: 100vh;
  @media (max-width: 768px) {
    padding: 20px;
  }
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.075),
      rgba(255, 255, 255, 0.075)
    ),
    url('https://www.fireflightapp.com/public/images/wildfire.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.8;
`

const BodyTitle = styled.h1`
width: 100%;
height: 88px;
@media (max-width:500px){
    width:100%
    font-weight: bold;
    font-size: 38px;
    line-height: 48px;
    margin-top:60px;
}
margin-top: 250px;
font-style: normal;
font-weight: bold;
font-size: 70px;
line-height: 88px;
color: #FFFFFF;
text-align:center;
`

const BodyDes = styled.h4`
width: 70vh;
height: 120px;
@media (max-width:768px){
    width:100%
    font-size:18px;
    line-height: 25px;
}
font-family: Open Sans;
font-style: normal;
font-weight: 300;
font-size: 3rem;
line-height: 4.5rem;
display: flex;
align-items: center;
color: #FFFFFF;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`
const Button = styled.button`
  width: 158px;
  height: 49px;
  border: none;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  margin: 0px auto;
  /* identical to box height */
  color: #251400;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 120px;
    height: 37px;
    left: 146.23px;
    top: 373.56px;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
  }
`

const LandingPage = ({
  setShowAuthForms,
  setLoginFormStatus,
  setRegisterFormStatus
}) => {
  return (
    <BodyEl>
      <NavBar
        toggleAuthForms={setShowAuthForms}
        toggleLoginStatus={setLoginFormStatus}
        toggleRegisterStatus={setRegisterFormStatus}
      />
      <Content>
        <BodyTitle>Wildfire Watch</BodyTitle>
        <BodyDes>
          The most detailed and updated forest fire information at your
          fingertips. Customize your notifications, and we've got the rest.
        </BodyDes>
        <Link to="/">
          <Button>Try It Out</Button>
        </Link>
      </Content>
    </BodyEl>
  )
}
export default LandingPage
