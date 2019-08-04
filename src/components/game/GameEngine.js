import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PUCK_STD_V,
  PADDING,
  INITIAL_PUCK_STATE,
  STRIKER_RADIUS,
  PUCK_RADIUS
} from "./gameConstants";

const GameEngine = ({ ctx, puck, setPuck, striker1 }) => {
  const [clock, setClock] = useState(0);
  const [active, setActive] = useState(false);

  useInterval(() => {
    animatePuck();
    setClock(prevTick => prevTick + 20);
  }, 20);

  const resetPuck = () => {
    setActive(false);
    setTimeout(() => {
      // setActive(true) <- uncomment when dynamic striker
      setPuck(INITIAL_PUCK_STATE);
    }, 1000);
  };

  const outsideGoalPosts = puck => {
    return (
      puck.centerX < CANVAS_WIDTH * 0.3 + puck.radius ||
      puck.centerX > CANVAS_WIDTH * 0.7 - puck.radius
    );
  };

  const checkForCollision = (striker, puck) => {
    if (calculateDistance(striker, puck) <= STRIKER_RADIUS + PUCK_RADIUS) {
      setPuck(prevState => {
        return {
          ...prevState,
          velocity: { x: -prevState.velocity.x, y: -prevState.velocity.y }
        };
      });
    }
  };

  const calculateDistance = (striker, puck) => {
    return Math.sqrt(
      (striker.centerX - puck.centerX) ** 2 +
        (striker.centerY - puck.centerY) ** 2
    );
  };

  const animatePuck = () => {
    if (!active) return;

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
        return {
          ...prevState,
          velocity: { x: -PUCK_STD_V, y: prevState.velocity.y }
        };
      });
    }

    if (puck.centerX - puck.radius - PADDING <= 0) {
      setPuck(prevState => {
        return {
          ...prevState,
          velocity: { x: PUCK_STD_V, y: prevState.velocity.y }
        };
      });
    }

    if (
      puck.centerY + puck.radius + PADDING >= CANVAS_HEIGHT &&
      outsideGoalPosts(puck)
    ) {
      setPuck(prevState => {
        return {
          ...prevState,
          velocity: { x: prevState.velocity.x, y: -PUCK_STD_V }
        };
      });
    }

    if (puck.centerY - puck.radius - PADDING <= 0 && outsideGoalPosts(puck)) {
      setPuck(prevState => {
        return {
          ...prevState,
          velocity: { x: prevState.velocity.x, y: PUCK_STD_V }
        };
      });
    }

    if (
      puck.centerY >= CANVAS_HEIGHT + puck.radius ||
      puck.centerY <= -puck.radius * 2
    ) {
      resetPuck();
    }

    // Is the puck hit by a striker? What happens
    // Did the puck pass the score line?
    checkForCollision(striker1, puck);
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
      <h3>Time: {}</h3>
      <button
        className="bson-button m-n"
        onClick={() =>
          setPuck(prevState => {
            setActive(true);
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
            setActive(false);
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
