export const INITIAL_STATE = {
  message: "Welcome, waiting for another player to join...",
  subscribers: {},
  activeGames: [],
  joined: false
};

export const lobbyReducer = (state, { event, payload }) => {
  switch (event) {
    case "phx_reply":
      return {
        ...state,
        message: payload.response.message || "Connection established",
        joined: true
      };
    case "ok":
      return { ...state, message: payload.response.message};
    case "active_games":
      console.log(payload);
      return { ...state, activeGames: payload.games };
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
