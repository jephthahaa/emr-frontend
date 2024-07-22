import { Checkbox } from "@/components/FormElements";
import Button from "@/components/misc/button";
import SingleImageDropzone from "@/components/misc/dropzones/singleFileDropzone";
import { Check, InfoIcon, X } from "lucide-react";
import React, { useState } from "react";
import { useDoctorSignupContext } from "../contexts/doctorSignupProvider";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import Dialog from "@/components/misc/dialog";

const UploadPhotoStep = () => {
  const { register, watch, setValue, isPending, status } =
    useDoctorSignupContext();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex w-full flex-col gap-10">
      <Dialog
        isOpen={status !== "idle"}
        dialogChild={() => <RegisterStatusView />}
      />
      <div className="flex flex-col gap-1.5">
        <p className="flex flex-row items-center gap-1 text-[32px] font-bold leading-8">
          Upload Photo
          <span>
            <InfoIcon size={16} />
          </span>
        </p>
        <p className="leading-6 text-[#6B7280]">
          Upload a photo for verification purposes.
        </p>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-row justify-between">
          <SingleImageDropzone
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              },
              maxSize: 5 * 1024 * 1024,
            }}
            height={200}
            width={610}
            label="Passport Photo"
            value={watch("profilePicture")}
            {...register("profilePicture")}
            onChange={(file) => setValue("profilePicture", file!)}
          />
        </div>
        <div className="flex flex-row">
          <Checkbox
            labelClassName="text-gray-500"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
            labelText="I confirm that the photo provided is my face and no one else’s face"
          />
        </div>
      </div>
      <Button
        isLoading={isPending}
        disabled={watch("profilePicture") === undefined || !confirm}
        type="submit"
      >
        Finish
      </Button>
    </div>
  );
};

export default UploadPhotoStep;

const RegisterStatusView = () => {
  const router = useRouter();
  const { status, error, reset } = useDoctorSignupContext();

  console.log(error, status);

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
        <p className="text-center leading-4 text-gray-500">
          {
            {
              error: error,
              idle: "",
              pending: "",
              success: " Congratulations, Your account has been created.",
            }[status]
          }
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <Button
          isLoading={status === "pending"}
          disabled={status === "pending"}
          type={"button"}
          variant="outline"
          onClick={() => {
            if (status === "success") {
              router.push("/login");
            } else {
              reset();
            }
          }}
          className="w-[348px] border-transparent bg-gray-50 hover:bg-gray-100"
        >
          {
            {
              error: "Try again",
              idle: "",
              pending: "",
              success: "Go to Login",
            }[status]
          }
        </Button>
      </div>
    </div>
  );
};
