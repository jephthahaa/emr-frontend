"use client";
import React, { useEffect, useRef } from "react";
import MessageItem from "./messageItem";
import socket from "@/services/socketIO";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useSession } from "next-auth/react";
import { IApiResponse, IMessege, IUser } from "@/types";
import { action } from "@/redux";
import { useQueryClient } from "@tanstack/react-query";

const MessagesArea = () => {
  const user = useSession().data?.user;
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { selectedChat, chats } = useAppSelector((state) => state.messages);
  const consultations = useAppSelector(
    (state) => state.consultation.activeConsultationDetails,
  );
  const scrollRef = useRef<HTMLSpanElement>(null);

  const lastMessage = chats[selectedChat!]?.messages?.slice(-1)[0];

  const messages = chats[selectedChat!]?.messages ?? [];

  const chatList = queryClient.getQueryData<IApiResponse<IUser[]>>([
    "chat",
    "list",
    "",
  ]);

  const OtherUser = chatList?.data.find((i) => i.id === selectedChat);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lastMessage?.id]);

  useEffect(() => {
    if (selectedChat === consultations?.userId) {
      socket.emit("SubscribeConsultation", consultations?.id);
    }

    return () => {
      if (selectedChat === consultations?.userId) {
        socket.emit("UnsubscribeConsultation", consultations?.id);
      }
    };
  }, [selectedChat, consultations]);

  useEffect(() => {
    socket.on("ConsultationEvent", (data: IMessege) => {
      if (selectedChat) {
        dispatch(
          action.messages.addMessage({ chatId: selectedChat!, message: data }),
        );
      }
    });

    return () => {
      socket.off("ConsultationEvent");
    };
  }, [selectedChat, dispatch]);

  return (
    <div className="flex flex-1 pb-2.5 pl-4">
      <div className="flex h-[calc(100vh-226px)] w-full flex-col overflow-y-scroll rounded-2xl bg-emerald-50 px-4 pt-2">
        {messages.map((chat, k) => {
          const isSender = chat.senderId === user?.id;
          const after = chat.senderId === messages[k + 1]?.senderId;

          return (
            <MessageItem
              key={k}
              isSender={isSender}
              after={after}
              messageItem={chat}
              profilePicture={
                isSender
                  ? user.profilePicture
                  : (OtherUser?.profilePicture as any)
              }
            />
          );
        })}
        <span ref={scrollRef}></span>
      </div>
    </div>
  );
};

export default MessagesArea;
