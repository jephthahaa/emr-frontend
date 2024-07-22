import { IReviewSchema } from "@/types/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  modaldata?: string;
  reviewData?: {
    id: string;
    doctor: {
      id: string;
      firstName: string;
      lastName: string;
    };
    data?: IReviewSchema;
  };
};

const initialState: initialStateType = {
  modaldata: undefined,
  reviewData: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalData(
      state: typeof initialState,
      action: PayloadAction<string | undefined>,
    ) {
      state.modaldata = action.payload;
    },

    setReviewData(
      state: typeof initialState,
      action: PayloadAction<initialStateType["reviewData"]>,
    ) {
      state.reviewData = action.payload;
    },

    setReviewDataRating(
      state: typeof initialState,
      action: PayloadAction<IReviewSchema>,
    ) {
      state.reviewData!.data = { ...state.reviewData!.data, ...action.payload };
    },

    resetModalData(state: typeof initialState) {
      state.modaldata = undefined;
    },
  },
});

export default modalSlice;
