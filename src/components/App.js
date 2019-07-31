import React from "react";
import Navbar from "./navigation/Navbar";
import LandingPage from "./LandingPage";
import GameContainer from "./game/GameContainer";
import Game from "./game/Game";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const routes = () => (
  <Switch>
    <Route path={"/"} exact render={props => <LandingPage props={props} />} />
    <Route
      path={"/game"}
      exact
      render={props => <GameContainer props={props} />}
    />
    <Route path={"/game/:id"} exact render={props => <Game props={props} />} />
  </Switch>
);

const App = () => {
  const history = createBrowserHistory();

  return (
    <div style={{ paddingBottom: 10 }}>
      <Router history={history} basename="/air-hockey-frontend">
        <Navbar />
        {routes()}
      </Router>
    </div>
  );
};

export default App;
