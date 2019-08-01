import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./components/contexts/UserContext";
//import "./css/materialize.min.css";
import "./css/app.css";
import "./css/navigation.css";
import "./css/modal.css";

const AppWrapper = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
