import React from 'react'

export const UPDATE_ADDRESSES="UPDATE_ADDRESSES"
export const FETCHING_ADDRESSES='FETCHING_ADDRESSES'
export const ERROR='ERROR'
export const NONE='NONE'
export const CLEAR='CLEAR'
export const UPDATE='UPDATE'

export default React.createContext({
    updateAddresses:(addresses)=>{},
    fetchAddresses:()=>{},
    saveAddress:(address,radius)=>{},
    updateAddress:(address,radius,id)=>{},
    clear:()=>{},
    reset:()=>{},
    state:{
        addresses:[],
        fetching:false,
        error:undefined,
        tester:false,
        current:null
    }
})