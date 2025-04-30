import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventReducer from "./eventSlice";
import bookingReducer from "./bookingSlice";
import eventRequestsReducer from "./eventRequestSlice";
import adminRequestReducer from "./adminRequestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    bookings: bookingReducer,
    eventRequests: eventRequestsReducer,
    adminRequest: adminRequestReducer,
  },
});

export default appStore;
