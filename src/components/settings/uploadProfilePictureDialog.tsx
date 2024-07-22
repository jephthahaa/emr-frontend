import React, { useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import SingleImageDropzone from "../misc/dropzones/singleFileDropzone";
import { isServiceMode } from "@/constants";

const UploadProfilePictureDialog = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const {
    shared: { uploadProfilePicture },
    admin: { settings },
  } = useZomujoApi(false);
  const [file, setFile] = useState<File | undefined>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteProfielPicture"],
    mutationFn: (file: File) => {
      if (file === undefined) {
        throw new Error("Uplaod an image first");
      }
      const formData = new FormData();

      if (isServiceMode("PATIENT")) {
        formData.append("image", file);
        return uploadProfilePicture(formData);
      }
      if (isServiceMode("DOCTOR")) {
        formData.append("profilePicture", file);
        return uploadProfilePicture(formData);
      }

      formData.append("profilePicture", file);
      return settings.uploadProfilePicture(formData);
    },
    onSuccess: async () => {
      toast.success("Account Profile Picture Updated!");
      await queryClient.invalidateQueries({ queryKey: ["user", "details"] });
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
    <div className="relative flex flex-col gap-8 rounded-xl bg-white p-5 shadow-xl">
      <div className="flex flex-col items-start gap-4">
        <p className="text-2xl font-bold leading-8">Upload profile picture</p>

        <SingleImageDropzone
          dropzoneOptions={{
            maxFiles: 1,
            accept: {
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
            },
            maxSize: 5 * 1024 * 1024,
          }}
          height={280}
          width={300}
          label="Front"
          value={file}
          onChange={setFile}
        />
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
            onClick={() => file && mutate(file)}
            className="h-10 min-w-[76px] bg-primary hover:bg-primaryDark"
          >
            {isPending ? (
              <Oval color="#fff" height={20} width={20} strokeWidth={3} />
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePictureDialog;
