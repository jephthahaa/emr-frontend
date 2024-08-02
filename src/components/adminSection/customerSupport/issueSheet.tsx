import React from "react";
import { IIssue } from "@/types";
import Chip from "@/components/misc/chip";
import Image from "next/image";
import { isUrl } from "@/utils";
import { format } from "date-fns";
import Button from "@/components/misc/button";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const IssueSheet = ({
  data,
  onClose,
}: {
  data: IIssue;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { postToggleIssue } = useZomujoApi(false).admin.helpSupport;

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin", "issue", data.id],
    mutationFn: () => postToggleIssue(data.id),
    onSuccess: async () => {
      toast.success("Issue toggled to fixed!");
      await queryClient.invalidateQueries({
        queryKey: ["admin", "help", "Issues"],
      });
      onClose();
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again");
    },
  });

  return (
    <div className="flex h-full flex-col gap-6 p-7">
      <p className="text-2xl font-bold leading-5">Issue Overview</p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-xl border border-gray-100 p-4">
          <p className="text-xl font-bold">{data.name}</p>
          <p className="text-gray-500">{data.description}</p>
        </div>
        <div className="flex flex-col gap-5 rounded-xl border border-gray-100 p-4 text-base">
          <div className="flex flex-row items-center justify-between">
            <p className="font-medium text-gray-500">User</p>
            <div className="flex items-center justify-end gap-2">
              <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                <Image
                  className="h-full w-full rounded-full"
                  src={isUrl(data.user.profilePicture)}
                  width={28}
                  height={28}
                  alt="profile"
                />
              </div>

              <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">
                {`${data.userType === "doctor" ? "Dr. " : ""}${
                  data.user.firstName
                } ${data.user.lastName}`}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="font-medium text-gray-500">Status</p>
            <Chip
              text={data.status ?? "open"}
              varient={
                { open: "yellow", fixed: "green" }[
                  data.status ?? "open"
                ] as "yellow"
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="font-medium text-gray-500">Date</p>
            <p className="font-medium">
              {" "}
              {format(new Date(data.createdAt), "MMM dd, yyyy")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end">
        <Button onClick={() => mutate()} isLoading={isPending}>
          Fixed
        </Button>
      </div>
    </div>
  );
};
export default IssueSheet;
