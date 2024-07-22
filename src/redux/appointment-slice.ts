import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedSlotId: string;
  reason: string;
  notes: string;
};

const initialState: initialStateType = {
  selectedSlotId: "",
  reason: "",
  notes: "",
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setSelectedSlotId(state, action: PayloadAction<string>) {
      state.selectedSlotId = action.payload;
    },
    setReason(state, action: PayloadAction<string>) {
      state.reason = action.payload;
    },
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload;
    },
  },
});

export default appointmentSlice;
