import React from 'react'
import styled from 'styled-components'

const HeadingEl = styled.h3`
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 25px;
/* identical to box height */

display: flex;
align-items: center;

color: #FFFFFF;
`
const NavMargin = styled.span`
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
font-family: Open-Sans;
margin-right:57px;
margin-left:57px;
`

const BodyEl = styled.div`
display:flex;
flex-flow:column;
align-items:center;
margin-top:120px;
`

const BodyTitle = styled.h1`

width: 495px;
height: 88px;

font-family: Oxygen;
font-style: normal;
font-weight: bold;
font-size: 70px;
line-height: 88px;
display: flex;
align-items: center;

color: #FFFFFF;
`

const BodyDes = styled.h4`
width: 710px;
height: 120px;

font-family: Open Sans;
font-style: normal;
font-weight: 300;
font-size: 35px;
line-height: 48px;
display: flex;
align-items: center;

color: #FFFFFF;
`

const Button = styled.button`
width: 158px;
height: 49px;
text-align:center;
font-family: Open Sans;
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 33px;
/* identical to box height */

color: #251400;
`

const Body = styled.body`
position: absolute;
width: 100%;
height: 100%;
background-image:url('https://www.fireflightapp.com/public/images/wildfire.jpg');
`

const LandingPage = (props) => {
    return (
        <Body>
            <HeadingEl>
                <NavMargin>
                    <h2>Home</h2>
                </NavMargin>
                <NavMargin>
                    <h2>Sign In</h2>
                </NavMargin>
                <NavMargin>
                    <h2>Sign Up</h2>
                </NavMargin>
            </HeadingEl>
            <BodyEl>
                <BodyTitle>
                    Wildfire Watch
                </BodyTitle>
                <BodyDes>
                    The most detailed and updated forest fire information at your fingertips. Customize your notifications, and we've got the rest.
                </BodyDes>
                <Button>Try It Out</Button>
            </BodyEl>
        </Body>
    )
}

export default LandingPage