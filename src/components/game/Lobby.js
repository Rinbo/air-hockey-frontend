import React, { useContext, useEffect, useState } from "react";
import history from "../../history";
import UserContext from "../contexts/UserContext";
import useChannel from "../hooks/useChannel";
import { lobbyReducer, INITIAL_STATE } from "../reducers/lobbyReducer";
import { Link } from "react-router-dom";

const Lobby = () => {
  const { name, setState } = useContext(UserContext);
  const [localGameName, setLocalGameName] = useState("");
  const [error, setError] = useState(false);

  const [state, broadcast] = useChannel(
    "game:lobby",
    name,
    lobbyReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    if (name === "") history.push(`${process.env.PUBLIC_URL}/`);
    if (state.joined) broadcast("get_active_games");
    return () => console.log("Leaving lobby");
    // eslint-disable-next-line
  }, [name, state.joined]);

  useEffect(() => {
    if (state.playerLeft) {
      broadcast("get_active_games", {});
      setState({
        type: "FLASH_MESSAGE",
        payload: { message: "A player left the lobby", code: 200 }
      });
    }
    // eslint-disable-next-line
  }, [state.playerLeft, broadcast]);

  const onSubmit = () => {
    if (localGameName.length < 3) {
      setError(true);
    } else {
      setError(false);
      setState({ type: "game", payload: localGameName });
      history.push(`${process.env.PUBLIC_URL}/game/${localGameName}`);
    }
  };

  const listActiveGames = () => {
    return state.activeGames.map(e => {
      const game = Object.keys(e);
      const playerCount = Object.values(e);
      return (
        <tr key={game}>
          <td>{game}</td>
          <td className="left-column">
            {playerCount < 2 ? renderLink(game) : "In progress"}
          </td>
        </tr>
      );
    });
  };

  const renderLink = path => {
    return (
      <Link
        to={`${process.env.PUBLIC_URL}/game/${path}`}
        className="bson-button"
        onClick={() => setState({ type: "game", payload: path })}
      >
        Join
      </Link>
    );
  };

  const onChange = e => {
    setLocalGameName(e.target.value);
  };

  return (
    <div className="bson-flex">
      <div>Welcome to the lobby, {name}</div>
      <h5>Create a game</h5>
      <div>
        <label>Game name</label>
        <input
          style={{ borderColor: error ? "red" : "" }}
          value={localGameName}
          onChange={e => onChange(e)}
        />
        <div
          style={{ color: "red", fontSize: 10, marginTop: 5, marginBottom: 10 }}
        >
          {error ? "Game name must be atleast 3 characters long" : null}
        </div>
        <button className="bson-button" onClick={() => onSubmit()}>
          Create
        </button>
      </div>
      <div className="bson-flex">
        <h5>Join an existing game</h5>
        <table>
          <thead>
            <tr>
              <th>Game</th>
              <th className="left-column">Status</th>
            </tr>
          </thead>
          <tbody>{state.joined ? listActiveGames() : null}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Lobby;
