"use client";
import React, { useEffect, useState } from "react";
import { UserSharingIcon } from "@/assets/icons";
import { Input } from "@/components/FormElements";
import Chip from "@/components/misc/chip";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import MessagesSidebarItem from "./messagesSidebarItem";
import { useDebounce } from "@/hooks/useDebouce";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../misc/loadingSpinner";
import { isServiceMode } from "@/constants";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { IGetUserFunc } from "@/types";

const MessagesSidebar = () => {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((state) => state.messages.selectedChat);
  const chatId = useSearchParams().get("chat");
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const [page] = useState(1);
  const {
    doctors,
    patients: { getAssingedDoctors },
    shared: { getChatMessages },
  } = useZomujoApi(false);

  const { data: patientsData, isLoading } = useQuery({
    queryKey: ["chat", "list", searchText, page],
    queryFn: () => {
      if (isServiceMode("DOCTOR")) {
        return doctors.getPatients({
          limit: 25,
          page: page,
          search: searchText,
        }) as IGetUserFunc;
      } else {
        return getAssingedDoctors({
          limit: 25,
          page: page,
          search: searchText,
        }) as IGetUserFunc;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: ChatMessages } = useQuery({
    queryKey: ["chat", "messages", selectedChat],
    queryFn: () => getChatMessages(selectedChat!),
  });

  const patients = patientsData?.data;

  useEffect(() => {
    if (patientsData) {
      const chat = patientsData.data.find((i) => i.id === chatId);
      if (chat && chatId && selectedChat === undefined) {
        dispatch(action.messages.setSelectedChat(chatId));
      }
    }
  }, [patientsData, chatId, dispatch, selectedChat]);

  useEffect(() => {
    if (ChatMessages) {
      dispatch(
        action.messages.setChatMessages({
          chatId: selectedChat!,
          messages: ChatMessages.data,
        }),
      );
    }
  }, [ChatMessages, selectedChat, dispatch]);

  return (
    <div className="h-full w-[380px] rounded-l-2xl border border-gray-200 bg-gray-50">
      <div className="flex flex-row items-center justify-between px-6 pb-8 pt-7">
        <p className="text-2xl font-bold">Messages</p>
      </div>
      <div className="w-full px-6">
        <Input
          className=" border-gray-200 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<FiSearch className="h-5 w-5" />}
          placeholder="Search Patients"
        />
      </div>
      <div className="flex w-full flex-row justify-between px-6 pb-8 pt-6">
        <div className="flex flex-row items-center gap-2">
          <UserSharingIcon className="h-[18px] w-[18px]" />
          <p className="text-sm">All</p>
          <Chip text={`${patients?.length ?? 0}`} varient="green" />
          <FiChevronDown />
        </div>
      </div>
      <div className="flex h-[calc(100vh-240px)] flex-col overflow-scroll">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <LoadingSpinner size={32} />
          </div>
        )}
        {patients?.map((patient) => (
          <MessagesSidebarItem key={patient.id} data={patient} />
        ))}
      </div>
    </div>
  );
};

export default MessagesSidebar;
