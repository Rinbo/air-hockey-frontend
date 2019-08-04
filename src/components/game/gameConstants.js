export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 500;
export const STRIKER_RADIUS = 15;
export const RIM_WIDTH = 10;
export const BOARD_LINE_WIDTH = 2;
export const PUCK_RADIUS = 10;
export const PADDING = RIM_WIDTH / 2;

export const INITIAL_PUCK_STATE = {
  centerX: 150,
  centerY: 150,
  radius: PUCK_RADIUS,
  velocity: { x: 0, y: 0 }
};

export const INITIAL_STRIKER1_STATE = {
  centerX: 150,
  centerY: 50,
  radius: STRIKER_RADIUS,
  velocity: { x: 0, y: 0 },
  deltaX: 150,
  deltaY: 50
};

export const CLOCK_INTERVAL = 1;

export const PUCK_STD_V = 4;
