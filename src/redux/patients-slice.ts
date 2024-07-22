import { IconsultationSidebarItems } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedTab: string;
  selectOpenTab: string;
  openTabs: {
    id: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
  }[];
  viewTabs: {
    [K in string]: {
      selectedTab: string;
    };
  };
};

const initialState: initialStateType = {
  selectedTab: "overview",
  selectOpenTab: "home",
  openTabs: [],
  viewTabs: {},
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setSelectedTab(state: typeof initialState, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
    setSelectedViewTab(
      state: typeof initialState,
      action: PayloadAction<{ id: string; tab: IconsultationSidebarItems }>,
    ) {
      if (state.viewTabs[action.payload.id]) {
        state.viewTabs[action.payload.id].selectedTab = action.payload.tab;
      }
    },
    setSelectOpenTab(
      state: typeof initialState,
      action: PayloadAction<string>,
    ) {
      state.selectOpenTab = action.payload;
    },
    addOpenTab(
      state: typeof initialState,
      action: PayloadAction<initialStateType["openTabs"][number]>,
    ) {
      const tab = state.openTabs.find((item) => item.id === action.payload.id);

      if (!tab) {
        state.viewTabs[action.payload.id] = {
          selectedTab: "overview",
        };
        state.openTabs.push(action.payload);
      }
    },

    removeOpenTab(state: typeof initialState, action: PayloadAction<string>) {
      delete state.viewTabs[action.payload];
      state.openTabs = state.openTabs.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export default patientsSlice;
