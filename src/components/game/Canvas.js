import React, { useState, useRef, useEffect } from "react";

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 500;

const Canvas = () => {
  const [onStriker, setOnStriker] = useState(false);
  const [validMove, setValidMove] = useState(true);
  const [striker1, setStriker1] = useState({
    centerX: 150,
    centerY: 50,
    radius: 30
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
    ctx.current.beginPath();
    ctx.current.arc(
      striker1.centerX,
      striker1.centerY,
      striker1.radius,
      0,
      2 * Math.PI
    );
    ctx.current.stroke();
    ctx.current.fill();
  };

  const startPosition = e => {
    const pos = getMousePos(e);
    console.log("PosX: ", pos.x);
    console.log("PosY: ", pos.y);
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

  const checkValidMove = object => {
  };

  const getMousePos = e => {
    const rect = gameCanvas.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const move = e => {
    if (!onStriker) return;
    const pos = getMousePos(e);
    checkValidMove(striker1);
    setStriker1(prevState => {
      return { ...prevState, centerX: pos.x, centerY: pos.y };
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
