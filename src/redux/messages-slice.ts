import { IMessege } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedChat?: string;
  chats: {
    [key: string]:
      | {
          messages: IMessege[];
        }
      | undefined;
  };
  recentChats: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
};

const initialState: initialStateType = {
  selectedChat: undefined,
  chats: {},
  recentChats: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setSelectedChat(
      state,
      action: PayloadAction<initialStateType["selectedChat"]>,
    ) {
      state.selectedChat = action.payload;
    },

    setChatMessages(
      state,
      action: PayloadAction<{ chatId: string; messages: IMessege[] }>,
    ) {
      state.chats[action.payload.chatId] = {
        messages: action.payload.messages,
      };
    },

    addMessage(state, action: PayloadAction<{ chatId: string; message: any }>) {
      if (state.chats[action.payload.chatId]) {
        state.chats[action.payload.chatId]?.messages.push(
          action.payload.message,
        );
      } else {
        state.chats[action.payload.chatId] = {
          messages: [action.payload.message],
        };
      }
    },

    addRecentChat(
      state,
      action: PayloadAction<initialStateType["recentChats"][0]>,
    ) {
      state.recentChats = [action.payload, state.recentChats[0]];
    },
  },
});

export default messagesSlice;
