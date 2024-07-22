import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedTab: string;
};

const initialState: initialStateType = {
  selectedTab: "personal",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSelectedTab(state: typeof initialState, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
  },
});

export default settingsSlice;
