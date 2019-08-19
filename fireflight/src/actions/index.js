import connect from '../helpers/connects.js'

//GENERIC
export const ERROR="ERROR"

//LOGIN
export const LOGGING_IN="LOGGIN_IN"
export const LOGIN_SUCCESS="LOGIN_SUCCESS"

//LOCATION_FETCH
export const LOCATION_FETCHING="LOCATION_FETCHING"
export const LOCATION_FETCHED="LOCATION_FETCHED"

//DANGER_FETCH
export const DANGER_FETCHING="DANGER_FETCHING"
export const DANGER_FETCH="DANGER_FETCH"

export const login = creds => dispatch =>{
    dispatch({type:LOGGING_IN})
    return connect.login(creds).then((result) => {
        
    }).catch((err) => {
        
    });
}