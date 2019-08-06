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
  const [active, setActive] = useState(true);
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

  const checkForCollision = (striker, puck) => {
    if (calculateDistance(striker, puck) <= STRIKER_RADIUS + PUCK_RADIUS) {
      // If striker is moving -> transfer its velocity to the puck
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
        //Resets clock for friction calculation
        setClock(0);
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
      }, 200);
    }
  };

  const capSpeed = velocity => {
    if (velocity >= 3.5) return 3.5;
    if (velocity < -3.5) return -3.5;
    return velocity;
  };

  const friction = () => {
    return 1 / ((100000 + clock) / 100000);
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

    // Dynamically set the velocity of the striker
    setStriker1(prevState => {
      return {
        ...prevState,
        velocity: {
          x: capSpeed(
            Math.round(prevState.centerX) - Math.round(prevState.deltaX)
          ),
          y: capSpeed(
            Math.round(prevState.centerY) - Math.round(prevState.deltaY)
          )
        },
        deltaX: prevState.centerX,
        deltaY: prevState.centerY
      };
    });

    // Render the pucks movement
    // @TODO add friction to eventually bring the pucks speed down to zero
    setPuck(prevState => {
      return {
        ...prevState,
        centerX: prevState.centerX + prevState.velocity.x,
        centerY: prevState.centerY + prevState.velocity.y,
        velocity: {
          x: prevState.velocity.x * friction(),
          y: prevState.velocity.y * friction()
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

    if (!sleep) checkForCollision(striker1, puck);
  };
  const outsideGoalPosts = puck => {
    return (
      puck.centerX < CANVAS_WIDTH * 0.3 || puck.centerX > CANVAS_WIDTH * 0.7
    );
  };

  return <div className="bson-flex" />;
};

export default GameEngine;
