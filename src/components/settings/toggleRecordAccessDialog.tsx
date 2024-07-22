import React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { cn, wait } from "@/utils";
import { IMedicalRecordRequest } from "@/types";

const ToggleRecordAccessDialog = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: {
    id: string;
    isApproved: boolean;
  };
}) => {
  const queryClient = useQueryClient();
  const { toggleRecordsRequest } = useZomujoApi(false).patients;

  const { data: medicalRecordRequests } = queryClient.getQueryData<{
    data: IMedicalRecordRequest[];
  }>(["patients", "medicalRecord", "requests", 1])!;

  const item = medicalRecordRequests.find((item) => item.id === data.id);

  const { mutate, isPending } = useMutation({
    mutationKey: [
      "patients",
      "toggle",
      "medicalRecord",
      "request",
      data.id,
      data.isApproved,
    ],
    mutationFn: () => toggleRecordsRequest({ requestId: data.id }),
    onSuccess: async () => {
      toast.success(`Access granted for Dr. ${item?.doctor.lastName}`);
      await queryClient.invalidateQueries({
        queryKey: ["patients", "medicalRecord", "requests"],
      });
      await wait(500);
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  return (
    <div className="relative flex w-[510px] flex-col gap-6 rounded-xl bg-white p-5 shadow-xl">
      <div className="flex flex-col items-start gap-4">
        <p className="text-2xl font-bold leading-8">Grant Access</p>
        <p className=" text-gray-500">
          Are you sure you want to give Dr. {item?.doctor.firstName}{" "}
          {item?.doctor.lastName} access to your medical records?
        </p>
      </div>
      <div className="flex flex-col items-end gap-6">
        <div className="flex flex-row items-center gap-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className=""
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => mutate()}
            variant={data.isApproved ? "destructive" : "default"}
            className={cn(
              "min-w-[112px]",
              !data.isApproved && "bg-primary hover:bg-primaryDark",
            )}
          >
            {isPending ? (
              <Oval color="#fff" height={18} width={18} strokeWidth={3} />
            ) : data.isApproved ? (
              "Revoke Access"
            ) : (
              "Grant Access"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToggleRecordAccessDialog;
