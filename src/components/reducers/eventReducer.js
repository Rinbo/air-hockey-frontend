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
  channelCount: 0,
  score: { player1: 0, player2: 0 },
  gameSet: false,
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
      const someoneJoined = Object.entries(payload.joins).length > 0;
      const someoneLeft = Object.entries(payload.leaves).length > 0;
      let change = 0;
      if (someoneJoined) change = 1;
      if (someoneLeft) change = -1;
      return {
        ...state,
        playerLeft: someoneLeft,
        channelCount: state.channelCount + change
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
    case "game_set":
      return { ...state, gameSet: true };
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
