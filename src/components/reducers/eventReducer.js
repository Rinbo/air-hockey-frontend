import {
  INITIAL_STRIKER1_STATE,
  INITIAL_STRIKER2_STATE,
  INITIAL_PUCK_STATE_TOP
} from "../game/gameConstants";

export const INITIAL_STATE = {
  message: "",
  status: {},
  playerLeft: false,
  subscribers: {
    player1: "",
    player2: ""
  },
  score: { player1: 0, player2: 0 },
  gameComplete: false,
  role: "",
  active: false,
  striker1: INITIAL_STRIKER1_STATE,
  striker2: INITIAL_STRIKER2_STATE,
  puck: INITIAL_PUCK_STATE_TOP,
  incomingMessage: {}
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
    case "presence_diff":
      return {
        ...state,
        playerLeft: !(Object.entries(payload.leaves).length === 0)
      };
    case "game_started":
      return {
        ...state,
        active: payload.message,
        subscribers: payload.subscribers
      };
    case "update_score":
      return { ...state, score: payload.score };
    case "player_joined":
      return { ...state, role: payload.message };
    case "player2_update":
      return { ...state, striker2: payload.striker2 };
    case "player1_update":
      return { ...state, striker1: payload.striker1, puck: payload.puck };
    case "game_complete":
      return { ...state, gameComplete: true };
    case "incoming_chat_message":
      return {
        ...state,
        incomingMessage: {
          name: payload.name,
          text: payload.incoming_message,
          timeStamp: payload.timestamp
        }
      };
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
