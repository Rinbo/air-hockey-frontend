import {
  INITIAL_STRIKER1_STATE,
  INITIAL_STRIKER2_STATE,
  INITIAL_PUCK_STATE_TOP
} from "../game/gameConstants";

import { UPDATE_CHAT_HISTORY } from "../types";

export const INITIAL_STATE = {
  message: "",
  status: {},
  playerLeft: false,
  subscribers: {
    player1: "",
    player2: ""
  },
  readyPlayer1: false,
  readyPlayer2: false,
  chatHistory: [],
  channelCount: 0,
  score: { player1: 0, player2: 0 },
  gameComplete: false,
  role: "",
  active: false,
  striker1: INITIAL_STRIKER1_STATE,
  striker2: INITIAL_STRIKER2_STATE,
  puck: INITIAL_PUCK_STATE_TOP
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
      const someoneLeft = Object.entries(payload.leaves).length > 0;
      return {
        ...state,
        playerLeft: someoneLeft
      };
    case "game_started":
      return {
        ...state,
        active: payload.message
      };
    case "update_score":
      return { ...state, score: payload.score };
    case "set_role":
      return { ...state, role: payload.role };
    case "player_joined":
      return {
        ...state,
        channelCount: payload.count,
        subscribers: payload.subscribers
      };
    case "player1_ready":
      return { ...state, readyPlayer1: payload.ready };
    case "player2_ready":
      return { ...state, readyPlayer2: payload.ready };
    case "player2_update":
      return { ...state, striker2: payload.striker2 };
    case "player1_update":
      return { ...state, striker1: payload.striker1, puck: payload.puck };
    case "game_complete":
      return { ...state, gameComplete: true };
    case "incoming_chat_message":
      return { ...state, chatHistory: [...state.chatHistory, payload] };
    case UPDATE_CHAT_HISTORY:
      return { ...state, chatHistory: payload };
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
