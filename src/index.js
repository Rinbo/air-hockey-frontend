import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./components/contexts/UserContext";
import { SocketProvider } from "./components/contexts/SocketContext";
import "./css/app.css";
import "./css/navigation.css";
import "./css/modal.css";

// ws://ec2-13-48-147-103.eu-north-1.compute.amazonaws.com:4000/socket
// ws://localhost:4000/socket

const AppWrapper = () => {
  return (
    <UserProvider>
      <SocketProvider wsUrl=" ws://localhost:4000/socket" options={{}}>
        <App />
      </SocketProvider>
    </UserProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
