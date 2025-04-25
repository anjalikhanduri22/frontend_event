import { createSlice } from "@reduxjs/toolkit";

const adminRequestSlice = createSlice({
  name: "adminrequest",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
  },
});

export const { addRequests } = adminRequestSlice.actions;

export default adminRequestSlice.reducer;
