import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  sessionExpired: boolean;
};

const initialState: initialStateType = {
  sessionExpired: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setSessionExpired(state: initialStateType, action: PayloadAction<boolean>) {
      state.sessionExpired = action.payload;
    },
  },
});

export default authenticationSlice;
