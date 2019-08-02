import React from "react";
import Navbar from "./navigation/Navbar";
import LandingPage from "./LandingPage";
import GameContainer from "./game/GameContainer";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import Lobby from "./game/Lobby";

/**
 * Note to future self:
 * Prepending Router path with ${process.env.PUBLIC_URL} is imperative for client rounter to work with gh-pages.
 * This also applies to using Router Links in the application.
 * Furhermore, if using relative path (ie: https://rinbo.github.io/<relative-path>) change segmentCount to 1 in 404.html
 */

 // @TODO - Create a status log with all server messages that can be popped open for viewing
 // @TODO - Make a global flash message system

const routes = () => (
  <Switch>
    <Route
      path={`${process.env.PUBLIC_URL}/`}
      exact
      render={props => <LandingPage props={props} />}
    />
    <Route
      path={`${process.env.PUBLIC_URL}/lobby`}
      exact
      render={props => <Lobby props={props} />}
    />
    <Route
      path={`${process.env.PUBLIC_URL}/game/:id`}
      exact
      render={props => <GameContainer props={props} />}
    />
  </Switch>
);

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <Navbar />
        {routes()}
      </Router>
    </div>
  );
};

export default App;
