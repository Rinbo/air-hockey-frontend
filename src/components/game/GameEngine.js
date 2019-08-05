import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDING,
  INITIAL_PUCK_STATE,
  STRIKER_RADIUS,
  PUCK_RADIUS,
  INITIAL_STRIKER1_STATE,
  CLOCK_INTERVAL
} from "./gameConstants";

const GameEngine = ({ puck, setPuck, striker1, setStriker1 }) => {
  const [clock, setClock] = useState(0);
  const [active, setActive] = useState(false);
  const [sleep, setSleep] = useState(false);

  useInterval(() => {
    animatePuck();
    setClock(prevTick => prevTick + CLOCK_INTERVAL);
  }, CLOCK_INTERVAL);

  const resetBoard = () => {
    setActive(false);
    setTimeout(() => {
      setActive(true);
      setPuck(INITIAL_PUCK_STATE);
      setStriker1(INITIAL_STRIKER1_STATE);
    }, 1000);
  };

  const outsideGoalPosts = puck => {
    return (
      puck.centerX < CANVAS_WIDTH * 0.3 || puck.centerX > CANVAS_WIDTH * 0.7
    );
  };

  const checkForCollision = (striker, puck) => {
    if (calculateDistance(striker, puck) <= STRIKER_RADIUS + PUCK_RADIUS) {
      if (striker1.velocity.x > 0 || striker1.velocity.y > 0) {
        setPuck(prevState => {
          return {
            ...prevState,
            velocity: {
              x: striker1.velocity.x,
              y: striker1.velocity.y
            }
          };
        });
      } else {
        if (Math.abs(striker.centerX - puck.centerX) < striker.radius) {
          setPuck(prevState => {
            return {
              ...prevState,
              velocity: { x: prevState.velocity.x, y: -prevState.velocity.y }
            };
          });
        } else {
          setPuck(prevState => {
            return {
              ...prevState,
              velocity: { x: -prevState.velocity.x, y: prevState.velocity.y }
            };
          });
        }
      }

      const speedParse = striker => {
        
      }

      setSleep(true);
      setTimeout(() => {
        setSleep(false);
      }, 400);
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

    setStriker1(prevState => {
      return {
        ...prevState,
        velocity: {
          x: Math.round(prevState.centerX) - Math.round(prevState.deltaX),
          y: Math.round(prevState.centerY) - Math.round(prevState.deltaY)
        },
        deltaX: prevState.centerX,
        deltaY: prevState.centerY
      };
    });

    setPuck(prevState => {
      return {
        ...prevState,
        centerX: prevState.centerX + prevState.velocity.x,
        centerY: prevState.centerY + prevState.velocity.y
      };
    });

    if (puck.centerX + puck.radius + PADDING >= CANVAS_WIDTH) {
      setPuck(prevState => {
        return {
          ...prevState,
          velocity: {
            x:
              prevState.velocity.x > 0
                ? -prevState.velocity.x
                : prevState.velocity.x,
            y: prevState.velocity.y
          }
        };
      });
    }

    if (puck.centerX - puck.radius - PADDING <= 0) {
      setPuck(prevState => {
        return {
          ...prevState,
          velocity: {
            x: Math.abs(prevState.velocity.x),
            y: prevState.velocity.y
          }
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
          velocity: {
            x: prevState.velocity.x,
            y:
              prevState.velocity.y > 0
                ? -prevState.velocity.y
                : prevState.velocity.y
          }
        };
      });
    }

    if (puck.centerY - puck.radius - PADDING <= 0 && outsideGoalPosts(puck)) {
      setPuck(prevState => {
        return {
          ...prevState,
          velocity: {
            x: prevState.velocity.x,
            y: Math.abs(prevState.velocity.y)
          }
        };
      });
    }

    if (
      puck.centerY >= CANVAS_HEIGHT + puck.radius ||
      puck.centerY <= -puck.radius * 2
    ) {
      resetBoard();
    }

    if (!sleep) checkForCollision(striker1, puck);
  };

  if (clock % 20 === 0) {
    console.log(striker1.velocity);
  }

  return (
    <div className="bson-flex">
      <h3>Time: {}</h3>
      <button className="bson-button m-n" onClick={() => setActive(true)}>
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
