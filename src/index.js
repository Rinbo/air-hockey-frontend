import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./css/materialize.min.css";
import "./css/app.css";

const AppWrapper = () => {
  return <App />;
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
