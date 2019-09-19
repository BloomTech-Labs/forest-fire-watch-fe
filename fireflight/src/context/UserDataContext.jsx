import React, { useReducer, createContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import { subscribeUser as getSub } from "../subscriptions";

const GET_USER_DATA = "GET_USER_DATA";
const UPDATE_RECEIVE_SMS = "UPDATE_RECEIVE_SMS";
const UPDATE_RECEIVE_PUSH = "UPDATE_RECEIVE_PUSH";
const ADD_PHONE_NUMBER = "ADD_PHONE_NUMBER";

const userDataReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        username: action.payload[0],
        phone: action.payload[1],
        receivePush: action.payload[2],
        receiveSMS: action.payload[3]
      };
    case ADD_PHONE_NUMBER:
      return {
        ...state,
        phone: action.payload
      };
    case UPDATE_RECEIVE_SMS:
      return {
        ...state,
        receiveSMS: action.payload
      };
    case UPDATE_RECEIVE_PUSH:
      return {
        ...state,
        receivePush: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userDataState, dispatch] = useReducer(userDataReducer, {
    username: "",
    phone: "",
    receiveSMS: false,
    receivePush: false
  });

  const getUserData = () => {
    axiosWithAuth()
      .get("/users/user")
      .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_USER_DATA,
          payload: [
            res.data.username,
            res.data.cell_number,
            res.data.receive_push,
            res.data.receive_sms
          ]
        });
      })
      .catch(err => console.log(err.response));
  };

  const addPhoneNumber = number => {
    const data = { cell_number: number.replace(" ", "").replace(" ", "") };
    axiosWithAuth()
      .put("/users/", data)
      .then(res => {
        dispatch({
          type: ADD_PHONE_NUMBER,
          payload: number
        });
      })
      .catch(err => console.log(err.response));
  };

  const updateTextAlerts = change => {
    const data = { receive_sms: JSON.stringify(change) };
    axiosWithAuth()
      .put("/users/", data)
      .then(res => {
        dispatch({
          type: UPDATE_RECEIVE_SMS,
          payload: change
        });
      })
      .catch(err => console.log(err.response));
  };

  const updatePushAlerts = change => {
    if (Notification.permission === "default") {
      getSub();
    } else if (Notification.permission === "denied") {
      alert(
        "You must allow notifications in your browser settings to activate this feature"
      );
    } else {
      axiosWithAuth()
        .put("/users/", { receive_push: change })
        .then(res => {
          dispatch({
            type: UPDATE_RECEIVE_PUSH,
            payload: change
          });
        })
        .catch(err => console.log(err.response));
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        userDataState,
        dispatch,
        getUserData,
        updateTextAlerts,
        updatePushAlerts,
        addPhoneNumber
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
