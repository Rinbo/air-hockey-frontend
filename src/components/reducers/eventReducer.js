import {
  INITIAL_STRIKER1_STATE,
  INITIAL_STRIKER2_STATE,
  INITIAL_PUCK_STATE
} from "../game/gameConstants";

export const INITIAL_STATE = {
  message: "",
  status: {},
  subscribers: {},
  role: "",
  active: false,
  striker1: INITIAL_STRIKER1_STATE,
  striker2: INITIAL_STRIKER2_STATE,
  puck: INITIAL_PUCK_STATE
};

export const eventReducer = (state, { event, payload }) => {
  switch (event) {
    case "phx_reply":
      return {
        ...state,
        message: payload.response.message
      };
    case "ok":
      return { ...state, message: payload.response.message };
    case "game_started":
      return { ...state, active: payload.message };
    case "player_joined":
      return { ...state, role: payload.message };
    case "player_left":
      return { ...state, playerLeft: true };
    case "player2_update":
      console.log(payload, "player2_update")
      return { ...state, striker2: payload.striker2 };
    case "player1_update":
      console.log(payload, "player1_update")
      return { ...state, striker1: payload.striker1, puck: payload.puck };
    case "subscribers":
      return { ...state, subscribers: payload };
    case "error":
      console.log(event);
      console.log(payload, "error payload");
      return { ...state, message: payload.message };
    default:
      return state;
  }
};
