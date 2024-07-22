import { Attachment01Icon, SentIcon } from "@/assets/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import socket from "@/services/socketIO";
import { IApiResponse, IMessege, IUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const MessageInputBar = () => {
  const currentUser = useSession().data?.user;
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const selectedChat = useAppSelector((state) => state.messages.selectedChat);
  const consultations = useAppSelector(
    (state) => state.consultation.activeConsultationDetails,
  );

  const chatList = queryClient.getQueryData<IApiResponse<IUser[]>>([
    "chat",
    "list",
    "",
    1,
  ]);

  const user = chatList?.data.find((i) => i.id === selectedChat);

  const [messageText, setMessageText] = useState("");

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageText.trim() === "") return;

    const message: IMessege = {
      id: Math.random().toString(),
      receiverId: user?.id!,
      senderId: currentUser?.id!,
      message: messageText,
      consultationId: consultations?.id!,
      createdAt: new Date().toISOString(),
      fileUrl: null,
      read: false,
    };
    socket.emit("ConsultationChatEvent", message);
    dispatch(action.messages.addMessage({ chatId: selectedChat!, message }));
    setMessageText("");
  };

  return (
    <div className="ml-4 flex flex-row items-center gap-4 rounded-[20px] border border-gray-100 p-6">
      <div className="flex flex-row gap-2">
        <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 p-3">
          <Attachment01Icon className="h-4 w-4" />
        </button>
      </div>
      {selectedChat === consultations?.userId ? (
        <form onSubmit={onSendMessage} className="relative flex flex-1">
          <input
            disabled={consultations === undefined}
            className="h-11 w-full rounded-xl border border-gray-300 bg-grayscale-10 pl-4 pr-12 outline-none"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={user ? `Message @${user.firstName}` : "Type a message"}
          />
          <button
            disabled={consultations === undefined}
            className="absolute right-0 top-1/2 flex h-11 w-12 -translate-y-1/2 items-center justify-center rounded-full"
          >
            <SentIcon className="h-5 w-5 rotate-45 fill-primary text-white" />
          </button>
        </form>
      ) : (
        <div className="relative flex flex-1 items-center justify-center">
          <p className="text-gray-500">No Active Consultation</p>
        </div>
      )}
    </div>
  );
};

export default MessageInputBar;
