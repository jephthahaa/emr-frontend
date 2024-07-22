"use client";
import React, { useEffect } from "react";
import MessageInputBar from "./messageInputBar";
import MessagesArea from "./messagesArea";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { IApiResponse, IUser } from "@/types";
import { isServiceMode } from "@/constants";
import { action } from "@/redux";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import MessagesConsultationTimer from "./messagesConsultationTimer";
import Image from "next/image";
import { isUrl } from "@/utils";

const MessagesMain = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const recentChats = useAppSelector((state) => state.misc.recentChats);
  const selectedChat = useAppSelector((state) => state.messages.selectedChat);
  const activeConsultation = useAppSelector(
    (state) => state.consultation.activeConsultationDetails,
  );

  const chatList = queryClient.getQueryData<IApiResponse<IUser[]>>([
    "chat",
    "list",
    "",
    1,
  ]);

  const user = chatList?.data.find((i) => i.id === selectedChat);

  useEffect(() => {
    if (activeConsultation?.userId === selectedChat && user) {
      const u = recentChats.find((i) => i?.id === user.id);
      if (!u) {
        dispatch(action.misc.addRecentChat(user));
      }
    }
  }, [selectedChat, user, dispatch, activeConsultation?.userId, recentChats]);

  if (user === undefined) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-2xl font-bold text-gray-500">Select a chat</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex flex-row items-center justify-between rounded-tr-2xl border-y border-r border-gray-200 px-4 py-6">
        <div className="flex flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-500">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(user.profilePicture)}
              width={40}
              height={40}
              alt="profile"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">
              {" "}
              {`${
                isServiceMode("PATIENT") ? "Dr. " : ""
              }${user?.firstName} ${user?.lastName}`}
            </p>
            <p className="text-xs font-medium text-gray-500">{user?.email}</p>
          </div>
        </div>
        {activeConsultation?.userId === selectedChat &&
          isServiceMode("DOCTOR") && (
            <Button
              variant="destructive"
              onClick={() => {
                router.push(
                  `/patients/${activeConsultation?.userId}/consultation`,
                );
              }}
              className="bg-error-50 font-medium text-error-600 hover:bg-error-75"
            >
              End Consultation
            </Button>
          )}
        <MessagesConsultationTimer />
      </div>
      <MessagesArea />
      <MessageInputBar />
    </div>
  );
};

export default MessagesMain;
