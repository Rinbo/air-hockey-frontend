export const INITIAL_STATE = {
  message: "",
  status: {},
  subscribers: {},
  role: "",
  active: false
};

export const eventReducer = (state, { event, payload }) => {
  switch (event) {
    case "phx_reply":
      return {
        ...state,
        message: payload.response.message || "Connection established"
      };
    case "ok":
      return { ...state, message: payload.response.message };
    case "game_started":
      return { ...state, message: "Game successfully initialized" };
    case "player_added":
      return { ...state, message: payload.message };
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
