import { IMessege } from "@/types";
import { cn, isUrl } from "@/utils";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

const MessageItem = ({
  isSender = false,
  after = false,
  messageItem,
  profilePicture,
}: {
  isSender?: boolean;
  after?: boolean;
  messageItem: IMessege;
  profilePicture?: string;
}) => {
  return (
    <div
      className={cn(
        "m flex w-[75%] flex-row items-end gap-4",
        isSender && "flex-row-reverse self-end",
        after ? "mb-0.5" : "mb-2",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 -translate-y-5 rounded-full bg-gray-500 opacity-0",
          !after && "opacity-100",
        )}
      >
        <Image
          className="h-full w-full rounded-full"
          src={isUrl(profilePicture)}
          width={40}
          height={40}
          alt="profile"
        />
      </div>
      <div className={cn("flex flex-col gap-1", isSender && "items-end")}>
        <div
          className={cn(
            "rounded-xl p-4 shadow-sm",
            !after && isSender && "rounded-br-none",
            !after && !isSender && "rounded-bl-none",
            isSender ? "bg-primary text-white" : "bg-white",
          )}
        >
          <p className="text-sm">{messageItem.message}</p>
        </div>
        <p
          className={cn(
            "hidden text-xs font-medium text-gray-500",
            !after && "block",
          )}
        >
          {format(new Date(messageItem.createdAt), "hh:mm a")}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
