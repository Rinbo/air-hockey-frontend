import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { CANVAS_WIDTH } from "./gameConstants";

const GameEngine = ({ ctx, puck, setPuck, striker1 }) => {
  const [clock, setClock] = useState(0);
  const [go, setGo] = useState(false);

  const interval = useInterval(() => {
    animatePuck();
    setClock(prevTick => prevTick + 10);
  }, 10);

  const animatePuck = () => {
    if (!go) return;

    setPuck(prevState => {
      return {
        ...prevState,
        centerX: prevState.centerX + prevState.velocity.x,
        centerY: prevState.centerY + prevState.velocity.y
      };
    });

    // I need some gates here:
    // Is the puck hitting a wall? What happens
    if (puck.centerX + puck.radius >= CANVAS_WIDTH) {
      setPuck(prevState => {
        return { ...prevState, velocity: { x: -1, y: 0 } };
      });
    }

    if (puck.centerX - puck.radius <= 0) {
      setPuck(prevState => {
        return { ...prevState, velocity: { x: 1, y: 0 } };
      });
    }
    // Is the puck hit by a striker? What happens
    // Did the puck pass the score line?
  };

  if (clock % 1000 === 0)
    console.log(
      "posX: ",
      puck.centerX,
      "posY: ",
      puck.centerY,
      "xv: ",
      puck.velocity.x
    );

  return (
    <div className="bson-flex">
      <h3>Time: {clock}</h3>
      <button
        className="bson-button m-n"
        onClick={() =>
          setPuck(prevState => {
            setGo(true);
            return { ...prevState, velocity: { x: 1, y: 0 } };
          })
        }
      >
        Start game
      </button>
      <button
        className="bson-button"
        onClick={() =>
          setPuck(prevState => {
            setGo(false);
            return { ...prevState, velocity: { x: 0, y: 0 } };
          })
        }
      >
        Stop game
      </button>
      <button className="bson-button m-n" onClick={(() => clearInterval(interval))}>Destroy game</button>
    </div>
  );
};

export default GameEngine;
