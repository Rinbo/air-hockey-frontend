import React, { useState, useRef, useEffect } from "react";
import { initBoard } from "./initBoard";
import GameEngine from "./GameEngine";

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  RIM_WIDTH,
  STRIKER_RADIUS,
  SPEED_LIMIT
} from "./gameConstants";

const MasterCanvas = ({
  puck,
  setPuck,
  striker1,
  setStriker1,
  striker2,
  broadcast,
  state,
  clock
}) => {
  const [onStriker, setOnStriker] = useState(false);

  const gameCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    gameCanvas.current.width = CANVAS_WIDTH;
    gameCanvas.current.height = CANVAS_HEIGHT;
    ctx.current = gameCanvas.current.getContext("2d");
    initBoard(ctx, striker1, striker2, puck);
  });

  useEffect(() => {
    broadcast("player1_update", { striker1, puck });
  }, [striker1, puck, broadcast]);

  useEffect(() => {
    if (clock === 0) {
      broadcast("game_complete", {});
    }
  }, [clock, broadcast]);

  const getMousePos = e => {
    const rect = gameCanvas.current.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startPosition = e => {
    const pos = getMousePos(e);
    if (!checkIfInCircle(pos)) return;
    setOnStriker(true);
  };

  const finishedPosition = () => {
    setOnStriker(false);
    setStriker1(prevState => {
      return { ...prevState, velocity: { x: 0, y: 0 } };
    });
  };

  const touchPosition = e => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    startPosition(mouseEvent);
  };

  const touchFinished = () => {
    const mouseEvent = new MouseEvent("mouseup", {});
    finishedPosition(mouseEvent);
  };

  const touchDraw = e => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    move(mouseEvent);
  };

  const checkIfInCircle = pos => {
    return (
      Math.sqrt(
        (pos.x - striker1.centerX) ** 2 + (pos.y - striker1.centerY) ** 2
      ) <=
      striker1.radius + RIM_WIDTH
    );
  };

  const withinXBounds = x => {
    if (x > CANVAS_WIDTH - STRIKER_RADIUS - RIM_WIDTH)
      return CANVAS_WIDTH - STRIKER_RADIUS - RIM_WIDTH;
    if (x < STRIKER_RADIUS + RIM_WIDTH) return STRIKER_RADIUS + RIM_WIDTH;
    return x;
  };

  const withinYBounds = y => {
    if (y > CANVAS_HEIGHT / 2 - RIM_WIDTH / 2 - STRIKER_RADIUS)
      return CANVAS_HEIGHT / 2 - RIM_WIDTH / 2 - STRIKER_RADIUS;
    if (y < STRIKER_RADIUS + RIM_WIDTH) return STRIKER_RADIUS + RIM_WIDTH;
    return y;
  };

  const capSpeed = velocity => {
    if (velocity >= SPEED_LIMIT) return SPEED_LIMIT;
    if (velocity < -SPEED_LIMIT) return -SPEED_LIMIT;
    return velocity;
  };

  const move = e => {
    if (!onStriker) return;
    const pos = getMousePos(e);
    setStriker1(prevState => {
      return {
        ...prevState,
        centerX: withinXBounds(pos.x),
        centerY: withinYBounds(pos.y),
        velocity: {
          x: capSpeed(pos.x - prevState.centerX),
          y: capSpeed(pos.y - prevState.centerY)
        }
      };
    });
    return () =>
      setStriker1(prevState => {
        return { ...prevState, velocity: { x: 0, y: 0 } };
      });
  };

  return (
    <div>
      <div>
        <GameEngine
          puck={puck}
          setPuck={setPuck}
          striker1={striker1}
          setStriker1={setStriker1}
          striker2={striker2}
          broadcast={broadcast}
          state={state}
        />
      </div>
      <canvas
        className="myCanvas"
        ref={gameCanvas}
        onMouseDown={e => startPosition(e)}
        onMouseUp={() => finishedPosition()}
        onMouseMove={e => move(e)}
        onTouchStart={e => touchPosition(e)}
        onTouchEnd={() => touchFinished()}
        onTouchMove={e => touchDraw(e)}
      />
    </div>
  );
};

export default MasterCanvas;
