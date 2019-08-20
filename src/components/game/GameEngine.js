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

const GameEngine = ({
  puck,
  setPuck,
  striker1,
  setStriker1,
  striker2,
  broadcast,
  setClock,
  clock
}) => {
  const [active, setActive] = useState(true);
  const [sleep, setSleep] = useState(false);
  const [friction, setFriction] = useState(0);

  useInterval(() => {
    animatePuck();
    setClock(prevTick => prevTick + CLOCK_INTERVAL);
    setFriction(prevTick => prevTick + CLOCK_INTERVAL);
  }, CLOCK_INTERVAL);

  const resetBoard = () => {
    setActive(false);
    setTimeout(() => {
      setActive(true);
      setPuck(INITIAL_PUCK_STATE);
      setStriker1(INITIAL_STRIKER1_STATE);
    }, 1000);
  };
  const checkForCollision = (striker, puck) => {
    if (calculateDistance(striker, puck) <= STRIKER_RADIUS + PUCK_RADIUS) {
      // If striker is moving -> transfer its velocity to the puck
      if (striker.velocity.x !== 0 || striker.velocity.y !== 0) {
        setPuck(prevState => {
          return {
            ...prevState,
            velocity: {
              x: striker.velocity.x,
              y: striker.velocity.y
            }
          };
        });
        //Resets friction for friction calculation
        setFriction(0);
      } else {
        // When striker is not moving , if puck hits upper and lower quadrant of striker
        // only reverse y-component of velocity
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

      // Prevent puck from getting stuck inside the striker
      setSleep(true);
      setTimeout(() => {
        setSleep(false);
      }, 400);
    }
  };

  const frictionFactor = () => {
    return 1 / ((100000 + friction) / 100000);
  };
  // Diagonal distance between center of striker and center of puck
  const calculateDistance = (striker, puck) => {
    return Math.sqrt(
      (striker.centerX - puck.centerX) ** 2 +
        (striker.centerY - puck.centerY) ** 2
    );
  };

  const animatePuck = () => {
    if (!active) return;
    // Render the pucks movement
    // @TODO add friction to eventually bring the pucks speed down to zero
    setPuck(prevState => {
      return {
        ...prevState,
        centerX: prevState.centerX + prevState.velocity.x,
        centerY: prevState.centerY + prevState.velocity.y,
        velocity: {
          x: prevState.velocity.x * frictionFactor(),
          y: prevState.velocity.y * frictionFactor()
        }
      };
    });
    // Bounce off right wall
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

    // Bounce off left wall
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

    // Bounce off bottom wall if not within goal posts
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

    // Bounce off top wall if not within goal posts
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

    // If it passes through goal posts, reset board
    if (
      puck.centerY >= CANVAS_HEIGHT + puck.radius ||
      puck.centerY <= -puck.radius * 2
    ) {
      resetBoard();
    }

    if (!sleep) {
      checkForCollision(striker1, puck);
      checkForCollision(striker2, puck);
    }
    if (clock % 30 === 0) broadcast("player1_update", { striker1, puck });
  };
  const outsideGoalPosts = puck => {
    return (
      puck.centerX < CANVAS_WIDTH * 0.3 || puck.centerX > CANVAS_WIDTH * 0.7
    );
  };

  return <div className="bson-flex" />;
};

export default GameEngine;
