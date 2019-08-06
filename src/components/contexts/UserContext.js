import React, { useReducer } from "react";

const UserContext = React.createContext("user");

const initialState = {
  name: "Robin",
  game: "Robins Game",
  role: "master"
};

const reducer = (state, action ) => {

  switch (action.type) {
    case "user":
      return { ...state, name: action.payload };
    case "game":
      return { ...state, game: action.payload };
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
