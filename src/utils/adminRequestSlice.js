import { createSlice } from "@reduxjs/toolkit";

const adminRequestSlice = createSlice({
  name: "adminRequest",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,

    removeRequests: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequests, removeRequests } = adminRequestSlice.actions;

export default adminRequestSlice.reducer;
