import React, { useState, useRef, useEffect } from "react";

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 500;
const STRIKER_RADIUS = 15;
const RIM_WIDTH = 10;
const BOARD_LINE_WIDTH = 2;

const Canvas = () => {
  const [onStriker, setOnStriker] = useState(false);
  const [striker1, setStriker1] = useState({
    centerX: 150,
    centerY: 50,
    radius: STRIKER_RADIUS
  });

  const gameCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    gameCanvas.current.width = CANVAS_WIDTH;
    gameCanvas.current.height = CANVAS_HEIGHT;
    ctx.current = gameCanvas.current.getContext("2d");
    initBoard();
  });

  const initBoard = () => {
    // The board
    ctx.current.beginPath();
    ctx.current.lineWidth = RIM_WIDTH;
    ctx.current.strokeStyle = "black";

    // Left
    ctx.current.moveTo(0, 0);
    ctx.current.lineTo(0, CANVAS_HEIGHT);

    // Top Left
    ctx.current.moveTo(0, 0);
    ctx.current.lineTo(CANVAS_WIDTH * 0.3, 0);

    // Top Right
    ctx.current.moveTo(CANVAS_WIDTH * 0.7, 0);
    ctx.current.lineTo(CANVAS_WIDTH, 0);

    // Right
    ctx.current.moveTo(CANVAS_WIDTH, 0);
    ctx.current.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);

    // Bottom Left
    ctx.current.moveTo(0, CANVAS_HEIGHT);
    ctx.current.lineTo(CANVAS_WIDTH * 0.3, CANVAS_HEIGHT);

    // Bottom Right
    ctx.current.moveTo(CANVAS_WIDTH * 0.7, CANVAS_HEIGHT);
    ctx.current.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.current.stroke();
    ctx.current.closePath();

    // Some lines
    ctx.current.beginPath();
    ctx.current.lineWidth = BOARD_LINE_WIDTH;
    ctx.current.strokeStyle = "red";
    ctx.current.moveTo(RIM_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.current.lineTo(CANVAS_WIDTH - RIM_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.current.stroke();
    ctx.current.closePath();

    // Top Goal Arc
    ctx.current.beginPath();

    ctx.current.strokeStyle = "blue";
    ctx.current.arc(
      CANVAS_WIDTH / 2,
      RIM_WIDTH / 2,
      (CANVAS_WIDTH - RIM_WIDTH) / 2,
      0,
      Math.PI
    );
    ctx.current.stroke();
    ctx.current.closePath();

    // Bottom Goal Arc
    ctx.current.beginPath();

    ctx.current.strokeStyle = "blue";
    ctx.current.arc(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT- RIM_WIDTH / 2,
      (CANVAS_WIDTH - RIM_WIDTH) / 2,
      0,
      2 * Math.PI
    );
    ctx.current.stroke();
    ctx.current.closePath();

     // The striker
     ctx.current.beginPath();
     ctx.current.lineWidth = RIM_WIDTH;
     ctx.current.strokeStyle = "black";
     ctx.current.fillStyle = "grey";
     ctx.current.arc(
       striker1.centerX,
       striker1.centerY,
       striker1.radius,
       0,
       2 * Math.PI
     );
     ctx.current.stroke();
     ctx.current.fill();
     ctx.current.closePath();
  };

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
  };

  const checkIfInCircle = pos => {
    return (
      Math.sqrt(
        (pos.x - striker1.centerX) ** 2 + (pos.y - striker1.centerY) ** 2
      ) <= striker1.radius
    );
  };

  const withinXBounds = x => {
    if (x > CANVAS_WIDTH - STRIKER_RADIUS - RIM_WIDTH)
      return CANVAS_WIDTH - STRIKER_RADIUS - RIM_WIDTH;
    if (x < STRIKER_RADIUS + RIM_WIDTH) return STRIKER_RADIUS + RIM_WIDTH;
    return x;
  };

  const withinYBounds = y => {
    if (y > (CANVAS_HEIGHT / 2) - RIM_WIDTH/2 - STRIKER_RADIUS)
      return (CANVAS_HEIGHT / 2) - RIM_WIDTH/2 - STRIKER_RADIUS;
    if (y < STRIKER_RADIUS + RIM_WIDTH) return STRIKER_RADIUS + RIM_WIDTH;
    return y;
  };

  const move = e => {
    if (!onStriker) return;
    const pos = getMousePos(e);
    setStriker1(prevState => {
      return {
        ...prevState,
        centerX: withinXBounds(pos.x),
        centerY: withinYBounds(pos.y)
      };
    });
  };

  return (
    <div className="flex flex-col justify-center" style={{ height: 240 }}>
      <canvas
        className="myCanvas"
        ref={gameCanvas}
        onMouseDown={e => startPosition(e)}
        onMouseUp={() => finishedPosition()}
        onMouseMove={e => move(e)}
      />
    </div>
  );
};

export default Canvas;

/* const touchPosition = e => {
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
  draw(mouseEvent);
}; */
