export const INITIAL_STATE = {
  message: "Welcome, waiting for another player to join...",
  activeGames: [],
  joined: false,
  playerLeft: false
};

export const lobbyReducer = (state, { event, payload }) => {
  switch (event) {
    case "phx_reply":
      return {
        ...state,
        joined: true
      };
    case "active_games":
      console.log(payload.games)
      return { ...state, activeGames: payload.games, playerLeft: false };
    case "presence_diff":
      return {
        ...state,
        playerLeft: !(Object.entries(payload.leaves).length === 0)
      };
    case "error":
      console.log(event);
      console.log(payload);
      return { ...state, message: payload.message };
    default:
      return state;
  }
};
