import React,{useState} from 'react'
import FireContext from './contextProvider'
import connector from '../helpers/connects'

function GlobalContext(props) {
    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)
    const [location,setLocation] = useState(null)
    const [remote,setRemote] = useState(connector)

    //structrure
    /**
     * user: get user
     * setUser: sets user (param user)
     * token: get token
     * token: sets token (param token)
     * location: get location
     * setLocation: set location(param location)
     * remote: Get remote connector
     */

    return (
        <FireContext.Provider value={{
            user,token,location,remote,setUser,setToken,setLocation
        }}>
            {props.children}
        </FireContext.Provider>
    )
}

export default GlobalContext
