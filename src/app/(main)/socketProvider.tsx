"use client";
import { Notification03Icon } from "@/assets/icons";
import { SERVICE_MODE, isServiceMode } from "@/constants";
import socket from "@/services/socketIO";
import { IBroadcast } from "@/types";
import { cn } from "@/utils";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated" && !isServiceMode("ADMIN")) {
      socket.emit("subscribe-init", {
        serviceMode: SERVICE_MODE,
        userId: session.data.user.id,
      });
    }
  }, [session.data?.user.id, session.status]);

  useEffect(() => {
    socket.on("BroadcastEvent", (data: IBroadcast) => {
      toast.custom((t) => (
        <div
          key={data.id}
          className={cn(
            "min-h-16 flex w-[290px] flex-row items-center rounded-xl border border-gray-200 bg-white shadow-sm",
            t.visible ? "animate-enter" : "animate-leave",
          )}
        >
          <div className="flex h-16 w-16 items-center justify-center">
            <Notification03Icon className="h-6 w-6 text-gray-500" />
          </div>
          <div className="flex flex-col items-start gap-1 p-2">
            <div className="flex flex-row items-center gap-2">
              <p className="leading-[16px]">New Notifcation</p>
            </div>
            <p className="text-sm text-gray-500">{data.message}</p>
          </div>
        </div>
      ));
    });

    return () => {
      socket.off("BroadcastEvent");
    };
  }, []);

  return <>{children}</>;
}
