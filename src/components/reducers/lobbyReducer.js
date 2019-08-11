export const INITIAL_STATE = {
  message: "Welcome, waiting for another player to join...",
  subscribers: {},
  channels: {}
};

export const lobbyReducer = (state, { event, payload }) => {
  switch (event) {
    case "phx_reply":
      return {
        ...state,
        message: payload.response.message || "Connection established"
      };
    case "ok":
      return { ...state, message: payload.response.message };
    case "game_created":
      console.log(payload);
      return { ...state, message: "Game successfully initialized" };
    case "subscribers":
      return { ...state, subscribers: payload };
    case "error":
      console.log(event);
      console.log(payload);
      return { ...state, message: payload.message };
    default:
      return state;
  }
};
