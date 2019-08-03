import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PUCK_STD_V, PADDING } from "./gameConstants";

const GameEngine = ({ ctx, puck, setPuck, striker1 }) => {
  const [clock, setClock] = useState(0);
  const [go, setGo] = useState(false);

  useInterval(() => {
    animatePuck();
    setClock(prevTick => prevTick + 20);
  }, 20);


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
    // Is the puck hitting a wall? This will also have to be determinted by the vector/velocity
    if (puck.centerX + puck.radius + PADDING >= CANVAS_WIDTH) {
      setPuck(prevState => {
        return { ...prevState, velocity: { x: -PUCK_STD_V, y: prevState.velocity.y } };
      });
    }

    if (puck.centerX - puck.radius - PADDING <= 0) {
      setPuck(prevState => {
        return { ...prevState, velocity: { x: PUCK_STD_V, y: prevState.velocity.y } };
      });
    }

    if (puck.centerY + puck.radius + PADDING >= CANVAS_HEIGHT) {
      setPuck(prevState => {
        return { ...prevState, velocity: { x: prevState.velocity.x, y: -PUCK_STD_V } };
      });
    }

    if (puck.centerY - puck.radius - PADDING <= 0) {
      setPuck(prevState => {
        return { ...prevState, velocity: { x: prevState.velocity.x, y: PUCK_STD_V } };
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
            return { ...prevState, velocity: { x: PUCK_STD_V, y: PUCK_STD_V } };
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
    </div>
  );
};

export default GameEngine;
