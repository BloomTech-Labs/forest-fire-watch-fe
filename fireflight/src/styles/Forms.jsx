import styled from 'styled-components';
import * as v from './vars'

export const Form=styled.form`
    display:flex;
    flex-direction:column;
    ${v.FontStack}
    font-size:12pt;
    ${v.tablet}{
        font-size:14pt;
    }
`

export const FormInput=styled.input`
    width:300px;
    margin:auto;
    padding:15px;
    font-size:.75rem;
    background-color:#e6e6e6;
    border-radius:5px;
    border:none;
    ${v.tablet}{
        margin:.5rem;
        width:auto;
    }
`

export const Button=styled.button`
    width: 250px;
    margin: 25px 25px 5px;
    padding: 10px;
    font-size: 1em;
    background-color: white;
    border-radius: 5px;
    border: solid 1px black;
    @media (max-width: 576px) {
        width: 200px;
        padding: 8px;
    }
    box-shadow:.25rem .25rem .25rem black;
    cursor:pointer;
`

export const GoodButton=styled(Button)`
    background-color:${v.AccentColor};
    color:white;
`

export const ErrorText=styled.div`
    color: darkred;
    font-size: 0.75em;
    margin: 0px;
    padding: 2px;
    height: 15px;
`

export const FormContainer=styled.div`
    background-color: #373d3f;
    border-radius: 25px;
    border: none;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
    margin: .5rem;
    transition: all 0.8s;
    width: 90%;
    min-height: 500px;
    padding:1rem;
    ${v.tablet}{
        box-sizing:border-box;
        width:75vw;
        margin:.5rem auto;
    }
`

export const FormSelect=styled.select`
    width:300px;
    margin: .75rem .5rem .5rem .5rem;
    padding:.5rem;
    font-size:.75rem;
    background-color:${v.Lilia};
    border-radius:5px;
    border:1px solid groove;
`

export const FormTextGroup=styled.div`
    background-color:${v.InputFormColor};
    border-radius:5px;
    width:100%;
    margin:.5rem;
    display:flex;
    & div:nth-child(1){
        border-radius:5px 0 0 5px;
        margin:1rem;
        margin-right:0;
        text-align:right;
        width:160px;
        color:white;
        ${v.tablet}{
            width:175px;
        }
    }
    input{
        width:100%;
        margin:0;
        background-color:${v.InputFormColor};
        border:none;
        ${v.FontStack}
        font-size:12pt;
        ${v.tablet}{
            font-size:14pt;
        }
        border-radius:0 5px 5px 0;
    }
`

export const FormRangeGroup=styled(FormTextGroup)`
    & div{
        text-align:left;
        width:115px;
        margin:1rem;
        margin-left:.5rem;
    }
    input[type=range]{
        -webkit-appearance:none;
        background:transparent;
        ${v.tablet}{
            margin-left:1rem;
        }
        &:focus{
            outline:none;
        }

        /* For Chrome */
        &::-webkit-slider-thumb{
            /* making invis for our styling */
            -webkit-appearance:none;

            border:1px solid black;
            background:${v.Ruby};
            margin-top:-.45rem;
            cursor:pointer;
            height:1rem;
            width:1rem;
            border-radius:100%;
        }
        &::-webkit-slider-runnable-track{
            width: 100%;
            height:.25rem;
            cursor:pointer;
            background:${v.Lilia};
            border-radius:1.3px;
            border:.2px solid black;
        }

        &:focus::-webkit-slider-runnable-track{
            background:${v.AccentColor};
        }

        /* For Mozilla */
        &::-moz-range-thumb{
            border:1px solid black;
            background:${v.Ruby};
            margin-top:0;
            cursor:pointer;
            height:1rem;
            width:1rem;
            border-radius:100%;
        }
        &::-moz-range-tack{
            width: 100%;
            height:.25rem;
            cursor:pointer;
            background:${v.Lilia};
            border-radius:1.3px;
            border:.2px solid black;
        }

        &::-ms-track{
            cursor:pointer;
            /* Hiding for Styling */
            background:transparent;
            border-color:transparent;
            color:transparent;
            
            width: 100%;
            height:.25rem;
            cursor:pointer;
        }
        &::-ms-fill-lower{
            border-radius:1.3px;
            border:.2px solid black;
            background-color:${v.Ruby};
        }
        &::-ms-fill-upper{
            border-radius:1.3px;
            border:.2px solid black;
            background-color:${v.Lilia};
        }

        &::-ms-thumb{
            border:1px solid ${v.Lilia};
            background:black;
            margin-top:0;
            height:1rem;
            width:1rem;
            border-radius:100%;
        }
    }
`