import { createSlice } from "@reduxjs/toolkit";

const eventRequestsSlice = createSlice({
  name: "eventRequests",
  initialState: null,
  reducers: {
    addEventRequests: (state, action) => action.payload,
    removeEventRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addEventRequests, removeEventRequest } =
  eventRequestsSlice.actions;
export default eventRequestsSlice.reducer;
