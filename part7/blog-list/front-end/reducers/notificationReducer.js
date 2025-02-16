export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { text: action.payload.text, type: action.payload.type };
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const setNotification = (text, type = "info") => {
  return {
    type: "SET_NOTIFICATION",
    payload: { text, type },
  };
};
