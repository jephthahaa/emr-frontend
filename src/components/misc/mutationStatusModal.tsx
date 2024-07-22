import React from "react";
import { cn } from "@/utils";
import { Check, X } from "lucide-react";
import Button from "./button";

type IStatus = "idle" | "pending" | "success" | "error";

type MutationStatusModalProps = {
  status: IStatus;
  message?: {
    [k in IStatus]: string;
  };
  buttonText: {
    [k in IStatus]?: string;
  };
  onClick?: () => void;
};

const MutationStatusModal = ({
  status,
  message = {
    error: "An error occurred",
    idle: "",
    pending: "",
    success: "Successful",
  },
  buttonText,
  onClick,
}: MutationStatusModalProps) => {
  return (
    <div className="relative flex w-[510px] flex-col items-center gap-12 rounded-3xl bg-white p-8 pt-16 shadow-xl">
      <div
        className={cn(
          "absolute left-1/2 top-0 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
          status === "pending" && "bg-gray-50",
          status === "success" && "bg-primaryLight",
          status === "error" && "bg-red-50",
        )}
      >
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b",
            status === "pending" && "from-gray-500 to-gray-700",
            status === "success" && "from-primaryLightBase to-primaryDark",
            status === "error" && "from-error-500 to-error-600",
          )}
        >
          {status === "success" && (
            <Check size={32} strokeWidth={3} className="text-white" />
          )}
          {status === "error" && (
            <X size={32} strokeWidth={3} className="text-white" />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl font-bold leading-6">
          {
            {
              error: "An error occurred",
              idle: "",
              pending: "",
              success: "Successful",
            }[status]
          }
        </p>
        <p className="text-center leading-4 text-gray-500">{message[status]}</p>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <Button
          isLoading={status === "pending"}
          disabled={status === "pending"}
          type={"button"}
          variant="outline"
          onClick={onClick}
          className="w-[348px] border-transparent bg-gray-50 hover:bg-gray-100"
        >
          {buttonText[status]}
        </Button>
      </div>
    </div>
  );
};

export default MutationStatusModal;
