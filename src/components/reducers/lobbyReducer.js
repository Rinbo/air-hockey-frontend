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
        joined: true
      };
    case "active_games":
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
