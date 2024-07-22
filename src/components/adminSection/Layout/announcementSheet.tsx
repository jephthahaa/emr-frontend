import TextArea from "@/components/FormElements/TextArea";
import MultiSelect from "@/components/FormElements/multiSelect";
import Button from "@/components/misc/button";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { ZOMUJO_SERVICE_MODE } from "@/constants";
import socket from "@/services/socketIO";
import useZomujoApi from "@/services/zomujoApi";
import { ValidateError, isUrl } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AnnouncementSheet = ({ onClose }: { onClose: () => void }) => {
  const { getBroadcasts } = useZomujoApi(false).admin;

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "broadcasts"],
    queryFn: () => getBroadcasts({}),
  });

  return (
    <div className="flex h-full flex-col justify-between gap-12 p-6">
      <h3 className="text-2xl font-bold">Announcements</h3>
      <div className="flex h-[calc(100vh-438px)] flex-1 flex-col overflow-y-scroll">
        {isLoading && (
          <div className="flex h-full w-full flex-1 items-center justify-center">
            <LoadingSpinner size={48} />
          </div>
        )}
        {data && data.data.length === 0 && (
          <div className="flex h-full w-full flex-1 items-center justify-center">
            <p className="text-xl text-gray-500">No Announcements yet</p>
          </div>
        )}
        {data &&
          data.data.map((broadcast) => (
            <div key={broadcast.id} className="mt-4 flex flex-row gap-2">
              <div className="h-10 w-10 shrink-0 rounded-full bg-gray-600">
                <Image
                  className="h-full w-full rounded-full"
                  src={isUrl(broadcast.admin.profilePicture)}
                  width={28}
                  height={28}
                  alt="profile"
                />
              </div>
              <div className="relative flex flex-1 flex-col gap-4">
                <p className="absolute -top-5 left-0 text-sm text-gray-500">
                  {broadcast.admin.name}
                </p>
                <div className="min-h-[40px] w-full rounded-2xl bg-gray-50 p-4">
                  {broadcast.message}
                </div>
              </div>
            </div>
          ))}
      </div>
      <AnnouncementInput onClose={onClose} />
    </div>
  );
};

export default AnnouncementSheet;

const scopes = [
  {
    label: "All Users",
    value: "ALL",
  },
  {
    label: "Doctors",
    value: ZOMUJO_SERVICE_MODE.DOCTOR,
  },
  {
    label: "Patients",
    value: ZOMUJO_SERVICE_MODE.PATIENT,
  },
];

const AnnouncementInput = ({ onClose = () => {} }) => {
  const user = useSession().data;
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [scope, setScope] = useState(scopes[0].value);

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin", "broadcasts", "send"],
    mutationFn: async ({
      message = "",
      scope = scopes[0].value,
    }: {
      message: string;
      scope: string;
    }) => {
      if (message.trim() === "") {
        throw new ValidateError("Message cannot be empty");
      }

      socket.emit("BroadcastEvent", { message, scope, adminId: user?.user.id });
      await queryClient.invalidateQueries({
        queryKey: ["admin", "broadcasts"],
      });
      return true;
    },
    onSuccess(data, variables, context) {
      toast.success("Announcement sent");
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else if (error instanceof ValidateError) {
        toast.error(error.message);
      } else {
        console.log(error);
        toast.error("An error occurred");
      }
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <TextArea
        className="h-28"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your announcement here"
      />
      <MultiSelect
        options={scopes}
        selected={scope}
        setSelected={setScope}
        label="Select scope"
      />
      <Button
        isLoading={isPending}
        onClick={() =>
          mutate({
            message,
            scope,
          })
        }
      >
        Send
      </Button>
    </div>
  );
};

// 32 48 32 230 96
