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
