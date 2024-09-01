import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import SingleImageDropzone from "@/components/misc/dropzones/singleFileDropzone";
import { Button } from "@/components/ui/button";

const UploadLabImage = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const queryClient = useQueryClient();
  const { addLabPicture } = useZomujoApi(false).patients.records;
  const [file, setFile] = useState<File | undefined>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["patients", "upload"],
    mutationFn: (file: File) => {
      if (file === undefined) {
        throw new Error("Upload an image first");
      }
      const formData = new FormData();
      formData.append("image", file);
      return addLabPicture(id, formData);
    },
    onSuccess: async () => {
      toast.success(`Lab Image Uploaded!`);
      await queryClient.invalidateQueries({ queryKey: ["patients", "labs"] });
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
        <p className="text-2xl font-bold leading-8">Upload Lab Image</p>

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
          label={"Lab Image"}
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

export default UploadLabImage;
