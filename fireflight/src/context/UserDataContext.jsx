import React, { useReducer, createContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const GET_USER_DATA = "GET_USER_DATA";

const userDataReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        username: action.payload[0],
        phone: action.payload[1],
        receiveSMS: action.payload[2],
        receivePush: action.payload[3]
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

  return (
    <UserDataContext.Provider value={{ userDataState, dispatch, getUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
