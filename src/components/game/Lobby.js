import React, { useContext, useEffect, useState } from "react";
import history from "../../history";
import UserContext from "../contexts/UserContext";

const Lobby = () => {
  const { name, game, setState } = useContext(UserContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (name === "") history.push(`${process.env.PUBLIC_URL}/`);
  }, [name]);


  const onSubmit = () => {
    if (game.length < 3) {
      setError(true);
    } else {
      setError(false);
      history.push(`${process.env.PUBLIC_URL}/game`);
    }
  };

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
          value={game}
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
      </div>
    </div>
  );
};

export default Lobby;
