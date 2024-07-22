import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal-slice";
import appointmentSlice from "./appointment-slice";
import patientsSlice from "./patients-slice";
import consultationSlice from "./consultation-slice";
import settingsSlice from "./settings-slice";
import authenticationSlice from "./authentication-slice";
import messagesSlice from "./messages-slice";
import miscSlice from "./misc-slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const action = {
  modal: modalSlice.actions,
  messages: messagesSlice.actions,
  appointment: appointmentSlice.actions,
  patients: patientsSlice.actions,
  consultation: consultationSlice.actions,
  settings: settingsSlice.actions,
  authentication: authenticationSlice.actions,
  misc: miscSlice.actions,
};

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    messages: messagesSlice.reducer,
    appointment: appointmentSlice.reducer,
    patients: patientsSlice.reducer,
    consultation: consultationSlice.reducer,
    settings: settingsSlice.reducer,
    authentication: authenticationSlice.reducer,
    misc: miscSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function saveToLocalStorage(state: RootState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
export const loadFromLocalStorage = (): RootState | undefined => {
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

store.subscribe(() =>
  saveToLocalStorage({
    consultation: store.getState().consultation,
    misc: store.getState().misc,
  } as RootState),
);

export default store;
