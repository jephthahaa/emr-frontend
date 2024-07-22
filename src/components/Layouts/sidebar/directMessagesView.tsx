import LoadingSpinner from "@/components/misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { cn, isUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DirectMessagesView = () => {
  const router = useRouter();

  const { getRecentChats } = useZomujoApi(false).doctors;
  const { data, isLoading } = useQuery({
    queryKey: ["doctor", "recent-chats"],
    queryFn: getRecentChats,
  });

  const recentChats = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium uppercase text-gray-400">
        Direct Messages
      </p>
      <div
        className={cn(
          "flex flex-col",
          isLoading && "h-24 w-full items-center justify-center",
        )}
      >
        {isLoading && <LoadingSpinner size={28} />}
        {recentChats.filter(Boolean).map((user) => (
          <button
            key={user?.id ?? "ops"}
            onClick={() => router.push(`/messages?chat=${user?.id}`)}
            className="flex h-12 w-full flex-row items-center justify-start gap-2 rounded-md p-3 duration-75 hover:bg-slate-50"
          >
            <div className="h-6 w-6 rounded-full bg-gray-600">
              <Image
                className="h-full w-full rounded-full"
                src={isUrl(user.profilePicture)}
                width={28}
                height={28}
                alt="profile"
              />
            </div>

            <p className="text-start text-sm font-medium text-gray-500">
              {`${user?.firstName} ${user?.lastName}`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DirectMessagesView;
