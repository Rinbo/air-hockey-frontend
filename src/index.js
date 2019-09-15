import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {
  PRODUCTION_BACKEND_URL,
  LOCALHOST,
  PRODUCTION_FRONTEND_URL,
  NETLIFY_FRONTEND_URL
} from "./urls";
import { UserProvider } from "./components/contexts/UserContext";
import { SocketProvider } from "./components/contexts/SocketContext";
import "./css/app.css";
import "./css/navigation.css";
import "./css/modal.css";

const AppWrapper = () => {
  let backendHost;
  const hostname = window && window.location && window.location.hostname;

  if (
    hostname === PRODUCTION_FRONTEND_URL ||
    hostname === NETLIFY_FRONTEND_URL
  ) {
    backendHost = PRODUCTION_BACKEND_URL;
  } else {
    backendHost = LOCALHOST;
  }

  return (
    <UserProvider>
      <SocketProvider wsUrl={backendHost} options={{}}>
        <App />
      </SocketProvider>
    </UserProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
