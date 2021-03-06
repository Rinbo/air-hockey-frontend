import React, { useReducer, createContext, useEffect } from "react";
import { USER, GAME, FLASH_MESSAGE } from "../types";

const UserContext = createContext("user");

const initialState = {
  name: "initialRender",
  gameName: "",
  announcement: { message: "", code: 200, delay: 5000 }
};

const reducer = (state, action) => {
  switch (action.type) {
    case USER:
      return { ...state, name: action.payload };
    case GAME:
      return { ...state, gameName: action.payload };
    case FLASH_MESSAGE:
      return { ...state, announcement: action.payload };
    default:
      return { ...state };
  }
};

export const UserProvider = props => {
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    const name = localStorage.getItem("playerName") || "";
    setState({ type: USER, payload: name });
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setState }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
