import React, { useReducer, createContext } from "react";

const UserContext = createContext("user");

const initialState = {
  name: "",
  gameName: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "user":
      return { ...state, name: action.payload };
    case "game":
      return { ...state, gameName: action.payload };
    default:
      return { ...state };
  }
};

export const UserProvider = props => {
  const [state, setState] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ ...state, setState }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
