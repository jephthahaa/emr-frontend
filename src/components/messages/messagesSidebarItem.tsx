import { TickDouble01Icon } from "@/assets/icons";
import { isServiceMode } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { cn, isUrl } from "@/utils";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MessagesSidebarItem = ({
  data,
}: {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedChat, chats } = useAppSelector((state) => state.messages);

  const lastMessageRecieved = chats[data.id]?.messages
    .filter((item) => item.senderId === data.id)
    .slice(-1)[0];

  const lastMessage = chats[data.id]?.messages.slice(-1)[0];

  const lastMessageTime = new Date(lastMessage?.createdAt ?? 0);

  return (
    <button
      type="button"
      onClick={() => {
        router.push(`/messages?chat=${data.id}`);
        dispatch(action.messages.setSelectedChat(data.id));
      }}
      className={cn(
        "flex flex-row items-center gap-3 px-6 py-4 [&+&]:border-t",
        "hover:bg-grayscale-75",
        selectedChat === data.id && "bg-primaryLight",
      )}
    >
      <div className="h-10 w-10 shrink-0 rounded-full bg-gray-500">
        <Image
          className="h-full w-full rounded-full"
          src={isUrl(data.profilePicture)}
          width={40}
          height={40}
          alt="profile"
        />
      </div>
      <div className="relative flex flex-1 flex-col text-start">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm font-bold">
            {`${isServiceMode("PATIENT") ? "Dr. " : ""}${data.firstName} ${
              data.lastName
            }`}
          </p>
          {lastMessage && (
            <p className="text-xs font-medium">
              {formatDistance(lastMessageTime, new Date(), { addSuffix: true })}
            </p>
          )}
        </div>
        <div className="w-[260px] text-ellipsis">
          <p className="text-xs text-gray-500">
            {lastMessage
              ? lastMessage.receiverId === data.id
                ? `You: ${lastMessage.message}`
                : lastMessage.message
              : "Tap to start a conversation"}
          </p>
        </div>
        {lastMessage?.receiverId === data.id && (
          <TickDouble01Icon
            className={cn(
              "absolute -bottom-2 right-0 h-4 w-4",
              lastMessageRecieved?.read && "text-primary",
            )}
          />
        )}
      </div>
    </button>
  );
};

export default MessagesSidebarItem;
