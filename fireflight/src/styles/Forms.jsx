import styled from 'styled-components';
import * as v from './vars'

export const Form=styled.form`
    display:flex;
    flex-direction:column;
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
    width: 200px;
    margin: 20px auto;
    padding: 10px 15px;
    border-radius: 55px;
    border: none;
    background-color: #c06c84;
    color: #f2f2f2;
    font-size: 1em;
`

export const ErrorText=styled.div`
    color: darkred;
    font-size: 0.75em;
    margin: 0px;
    padding: 2px;
    height: 15px;
`

export const FormContainer=styled.div`
    background-color: #f2f2f2;
    border-radius: 25px;
    border: none;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
    margin: 15px .5rem;
    transition: all 0.8s;
    width: 90%;
    min-height: 500px;
    padding:1rem;
    ${v.tablet}{
        width:100vw;
        box-sizing:border-box;
        margin:.5rem 0;
    }
`

export const FormSelect=styled.select`
    width:300px;
    margin: .75rem .5rem .5rem 1.5rem;
    padding:15px;
    font-size:.75rem;
    background-color:#e6e6e6;
    border-radius:5px;
    border:1px solid groove;
`