import React, { useContext, useEffect, useState } from "react";
import history from "../../history";
import UserContext from "../contexts/UserContext";
import useChannel from "../hooks/useChannel";
import { lobbyReducer, INITIAL_STATE } from "../reducers/lobbyReducer";

const Lobby = () => {
  const { name, gameName, setState } = useContext(UserContext);
  const [error, setError] = useState(false);

  const [state, broadcast] = useChannel(
    "game:lobby",
    name,
    lobbyReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    if (name === "") history.push(`${process.env.PUBLIC_URL}/`);
  }, [name]);

  const onSubmit = () => {
    if (gameName.length < 3) {
      setError(true);
    } else {
      setError(false);
      history.push(`${process.env.PUBLIC_URL}/game/${gameName}`);
    }
  };

  const listActiveGames = () => {
    return state.activeGames.map(e => {
      return <li>{e}</li>;
    });
  };

  if (state.joined) broadcast("get_active_games");

  const onChange = e => {
    setState({ type: "game", payload: e.target.value });
  };

  return (
    <div className="bson-flex">
      <div>Welcome to the lobby, {name}</div>
      <h5>Create a game</h5>
      <div>
        <label>Game name</label>
        <input
          style={{ borderColor: error ? "red" : "" }}
          value={gameName}
          onChange={e => onChange(e)}
        />
        <div style={{ color: "red", fontSize: 10 }}>
          {error ? "Game name must be atleast 3 characters long" : null}
        </div>
        <button className="bson-button" onClick={() => onSubmit()}>
          Create
        </button>
      </div>
      <div>
        <h5>Join an existing game</h5>
        <ul>{listActiveGames()}</ul>
      </div>
    </div>
  );
};

export default Lobby;
