import React from 'react'

//set default state for autocomplete
export default React.createContext({
    user:null,
    token:null,
    location:'',
    remote:{},
    setUser:(newUser)=>{},
    setToken:(newToken)=>{},
    setLocation:(newLocation)=>{}
})