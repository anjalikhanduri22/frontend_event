import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: null,
  reducers: {
    addEvents: (state, action) => action.payload,

    removeEvents: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addEvents, removeEvents } = eventSlice.actions;

export default eventSlice.reducer;
