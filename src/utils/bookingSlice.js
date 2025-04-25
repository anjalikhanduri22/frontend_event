import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: null,
  reducers: {
    addBookings: (state, action) => action.payload,
  },
});

export const { addBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
