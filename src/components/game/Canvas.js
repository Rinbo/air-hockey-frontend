import React, { useState, useRef, useEffect } from "react";

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 500;

const Canvas = () => {
  const [painting, setPainting] = useState(false);
  const gameCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    gameCanvas.current.width = CANVAS_WIDTH;
    gameCanvas.current.height = CANVAS_HEIGHT;
    ctx.current = gameCanvas.current.getContext("2d");
  }, []);

  const startPosition = e => {
    setPainting(true);
    const pos = getMousePos(e);
    ctx.current.lineTo(pos.x, pos.y);
    ctx.current.stroke();
  };

  const finishedPosition = () => {
    setPainting(false);
    ctx.current.beginPath();
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

  const getMousePos = e => {
    const rect = gameCanvas.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const touchDraw = e => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    draw(mouseEvent);
  };

  const draw = e => {
    if (!painting) return;
    const pos = getMousePos(e);
    ctx.current.lineWidth = 12;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = "black";
    ctx.current.lineTo(pos.x, pos.y);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(pos.x, pos.y);
  };

  return (
    <div className="flex flex-col justify-center" style={{ height: 240 }}>
      <canvas
        className="myCanvas"
        ref={gameCanvas}
        onMouseDown={e => startPosition(e)}
        onMouseUp={() => finishedPosition()}
        onMouseMove={e => draw(e)}
        onTouchStart={e => touchPosition(e)}
        onTouchEnd={() => touchFinished()}
        onTouchMove={e => touchDraw(e)}
      />
      <div>
        <button
          className="bson-button"
          style={{ margin: 10 }}
          onClick={() => {
            ctx.current.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          }}
        >
          Erase
        </button>
      </div>
    </div>
  );
};

export default Canvas;
