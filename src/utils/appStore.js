import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventReducer from "./eventSlice";
import bookingReducer from "./bookingSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    bookings: bookingReducer,
  },
});

export default appStore;
