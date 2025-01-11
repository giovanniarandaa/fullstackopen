import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotificationFn: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return null;
    },
  },
});

export const { setNotificationFn, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (message, duration = 2) => {
  return async (dispatch) => {
    dispatch(setNotificationFn(message));
    const timeout = setTimeout(() => {
      dispatch(clearNotification());
      clearTimeout(timeout);
    }, duration * 1000);
  };
};
