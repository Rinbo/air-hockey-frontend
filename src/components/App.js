import React from "react";
import Navbar from "./navigation/Navbar";
import LandingPage from "./LandingPage";
import GameContainer from "./game/GameContainer";
import Game from "./game/Game";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

/**
 * Note to future self:
 * Prepending Router path with ${process.env.PUBLIC_URL} is imperative for client rounter to work with gh-pages.
 * Furhermore, if using relative path (ie: https://rinbo.github.io/<relative-path>) change segmentCount to 1 in 404.html
 */

const routes = () => (
  <Switch>
    <Route
      path={`${process.env.PUBLIC_URL}/`}
      exact
      render={props => <LandingPage props={props} />}
    />
    <Route
      path={`${process.env.PUBLIC_URL}/game`}
      exact
      render={props => <GameContainer props={props} />}
    />
    <Route
      path={`${process.env.PUBLIC_URL}/game/:id`}
      exact
      render={props => <Game props={props} />}
    />
  </Switch>
);

const App = () => {
  const history = createBrowserHistory();

  return (
    <div style={{ paddingBottom: 10 }}>
      <Router history={history}>
        <Navbar />
        {routes()}
      </Router>
    </div>
  );
};

export default App;
