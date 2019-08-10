import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./components/contexts/UserContext";
import { SocketProvider } from "./components/contexts/SocketContext";
import "./css/app.css";
import "./css/navigation.css";
import "./css/modal.css";

const AppWrapper = () => {
  return (
    <UserProvider>
      <SocketProvider wsUrl="ws://localhost:4000/socket" options={{}}>
        <App />
      </SocketProvider>
    </UserProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
