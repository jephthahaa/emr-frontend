import { IMessege } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    const state: RootState = JSON.parse(serialisedState);
    return state;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

type initialStateType = {
  recentChats: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
};

const initialStateDefault: initialStateType = {
  recentChats: [],
};

const initialState = (): initialStateType => {
  if (typeof window !== "undefined") {
    if (loadFromLocalStorage() !== undefined) {
      return loadFromLocalStorage()!.misc;
    } else {
      return initialStateDefault;
    }
  } else {
    return initialStateDefault;
  }
};

const miscSlice = createSlice({
  name: "misc",
  initialState: initialState(),
  reducers: {
    addRecentChat(
      state,
      action: PayloadAction<initialStateType["recentChats"][0]>,
    ) {
      state.recentChats = [action.payload, state.recentChats[0]];
    },
  },
});

export default miscSlice;
