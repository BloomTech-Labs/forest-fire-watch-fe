import React, { useReducer, createContext } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
// import { subscribeUser as getSub } from '../subscriptions'
import {
  GET_USER_DATA,
  UPDATE_RECEIVE_SMS,
  UPDATE_RECEIVE_PUSH,
  ADD_PHONE_NUMBER
} from './userDataTypes'

const userDataReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        email: action.payload[0],
        phone: action.payload[1],
        receivePush: action.payload[2],
        receiveSMS: action.payload[3],
        firstName: action.payload[4],
        lastName: action.payload[5]
      }
    case ADD_PHONE_NUMBER:
      return {
        ...state,
        phone: action.payload
      }
    case UPDATE_RECEIVE_SMS:
      return {
        ...state,
        receiveSMS: action.payload
      }
    case UPDATE_RECEIVE_PUSH:
      return {
        ...state,
        receivePush: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export const UserDataContext = createContext()

export const UserDataProvider = ({ children }) => {
  const [userDataState, dispatch] = useReducer(userDataReducer, {
    email: '',
    phone: '',
    receiveSMS: false,
    receivePush: false,
    firstName: '',
    lastName: ''
  })

  const getUserData = () => {
    axiosWithAuth()
      .get('/users/user')
      .then(res => {
        console.log('/users/user', res.data)
        dispatch({
          type: GET_USER_DATA,
          payload: [
            res.data.email,
            res.data.cell_number,
            res.data.receive_push,
            res.data.receive_sms,
            res.data.first_name,
            res.data.last_name
          ]
        })
      })
      .catch(err => console.log(err.response))
  }

  const addPhoneNumber = number => {
    const data = {
      cell_number: number
        .split(' ')
        .join('')
        .split('-')
        .join('')
        .split('(')
        .join('')
        .split(')')
        .join('')
    }

    axiosWithAuth()
      .put('/users/', data)
      .then(res => {
        dispatch({
          type: ADD_PHONE_NUMBER,
          payload: number
        })
      })
      .catch(err => console.log(err.response))
  }

  const updateTextAlerts = change => {
    axiosWithAuth()
      .put('/users/', { receive_sms: change })
      .then(res => {
        dispatch({
          type: UPDATE_RECEIVE_SMS,
          payload: change
        })
      })
      .then(res => {
        if (change) {
          console.log('receiveSMS trigger')
          axiosWithAuth().get(`scheduler/triggerSMS`)
        }
      })
      .catch(err => console.log(err.response))
  }

  // const updatePushAlerts = change => {
  //   console.log('Notification permission: ' + Notification.permission)

  //   if (Notification.permission === 'default') {
  //     getSub()
  //   } else if (Notification.permission === 'denied') {
  //     alert(
  //       'You must allow notifications in your browser settings to activate this feature'
  //     )
  //   } else {
  //     axiosWithAuth()
  //       .put('/users/', { receive_push: change })
  //       .then(res => {
  //         dispatch({
  //           type: UPDATE_RECEIVE_PUSH,
  //           payload: change
  //         })
  //       })
  //       .then(res => {
  //         if (change) {
  //           getSub()
  //           console.log('receivePush trigger')
  //           axiosWithAuth().get(`scheduler/triggerPush`)
  //         }
  //       })
  //       .catch(err => console.log(err.response))
  //   }
  // }

  return (
    <UserDataContext.Provider
      value={{
        userDataState,
        dispatch,
        getUserData,
        updateTextAlerts,
        // updatePushAlerts,
        addPhoneNumber
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}
