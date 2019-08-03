import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  RIM_WIDTH,
  BOARD_LINE_WIDTH
} from "./gameConstants";

export const initBoard = (ctx, striker1) => {
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
    CANVAS_HEIGHT - RIM_WIDTH / 2,
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
