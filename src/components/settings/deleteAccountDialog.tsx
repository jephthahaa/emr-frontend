import React from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

const DeleteAccountDialog = ({ onClose }: { onClose: () => void }) => {
  const { deleteAccount } = useZomujoApi(false).shared;

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account Deleted!");
      signOut();
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
    <div className="relative flex w-[510px] flex-col gap-8 rounded-xl bg-white p-5 shadow-xl">
      <div className="flex flex-col items-start gap-4">
        <p className="text-2xl font-bold leading-8">Delete your account</p>
        <p className=" text-gray-500">
          Are you sure you want to delete your account? This action is
          irreversible.
        </p>
      </div>
      <div className="flex flex-col items-end gap-6">
        <div className="space-x-3">
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
            variant="destructive"
            className=""
          >
            {isPending ? (
              <Oval color="#fff" height={20} width={20} strokeWidth={3} />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
