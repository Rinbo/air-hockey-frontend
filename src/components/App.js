import React from "react";
import Navbar from "./navigation/Navbar";
import LandingPage from "./LandingPage";
import GameContainer from "./game/GameContainer";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import Lobby from "./game/Lobby";
import StatusMessage from "./utility/StatusMessage";

/**
 * Note to future self:
 * Prepending Router path with ${process.env.PUBLIC_URL} is imperative for client rounter to work with gh-pages.
 * This also applies to using Router Links in the application.
 * Furhermore, if using relative path (ie: https://rinbo.github.io/<relative-path>) change segmentCount to 1 in 404.html
 */

// @TODO - Create a status log with all server messages that can be popped open for viewing

const routes = () => (
  <Switch>
    <Route path={`${process.env.PUBLIC_URL}/`} exact component={LandingPage} />
    <Route path={`${process.env.PUBLIC_URL}/lobby`} exact component={Lobby} />
    <Route
      path={`${process.env.PUBLIC_URL}/game/:id`}
      exact
      render={props => <GameContainer props={props} />}
    />
  </Switch>
);

const App = () => {
  document.addEventListener(
    "touchmove",
    e => {
      if (e.target.className === "myCanvas") {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  return (
    <div className="container">
      <Router history={history}>
        <Navbar />
        <StatusMessage />
        {routes()}
      </Router>
    </div>
  );
};

export default App;
