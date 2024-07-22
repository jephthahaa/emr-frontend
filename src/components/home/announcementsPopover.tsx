"use client";
import useZomujoApi from "@/services/zomujoApi";
import { cn } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../misc/loadingSpinner";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Notification03Icon } from "@/assets/icons";

const AnnouncementsPopover = () => {
  const { getBroadcasts } = useZomujoApi(false).shared;

  const { data, isLoading } = useQuery({
    queryKey: ["system", "broadcasts"],
    queryFn: () => getBroadcasts({ limit: 6 }),
  });

  const broadcasts = data?.data ?? [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 bg-white p-3">
          <Notification03Icon className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex w-full flex-col gap-3 p-3">
          <p className="text-xl font-bold">Notifications</p>
          <hr />
          <div
            className={cn(
              "flex h-[300px] flex-col gap-2 overflow-y-scroll",
              isLoading && "items-center justify-center",
            )}
          >
            {isLoading && <LoadingSpinner />}
            {broadcasts.map((item) => (
              <div
                key={item.id}
                className="flex w-full flex-col gap-1 rounded-md bg-gray-50 p-2 duration-100 hover:bg-gray-100"
              >
                <div className="flex flex-row items-center gap-2 ">
                  <p className="leading-[16px]">{item.admin.name}</p>
                  <p className="text-sm leading-[14px] text-gray-700">
                    {format(new Date(item.createdAt), "dd MMMM, yyyy p")}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AnnouncementsPopover;
