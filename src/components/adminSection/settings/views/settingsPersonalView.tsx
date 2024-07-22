import { Input } from "@/components/FormElements";
import Button from "@/components/misc/button";
import Dialog from "@/components/misc/dialog";
import DeleteProfilePictureDialog from "@/components/settings/deleteProfilePictureDialog";
import UploadProfilePictureDialog from "@/components/settings/uploadProfilePictureDialog";
import { isServiceMode } from "@/constants";
import { getAdminInfo } from "@/services/server";
import useZomujoApi from "@/services/zomujoApi";
import { cn, isUrl } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type IPersonalDetails = {
  name: string;
};

const SettingsPersonalView = () => {
  const { updateName } = useZomujoApi(false).admin.settings;

  const { data: userDetails } = useQuery({
    enabled: isServiceMode("ADMIN"),
    queryKey: ["user", "details"],
    queryFn: () => getAdminInfo(),
  });

  const defaultValues: IPersonalDetails = useMemo(
    () => ({
      name: userDetails?.name ?? "",
    }),
    [userDetails],
  );

  const { register, handleSubmit, setValue } = useForm<IPersonalDetails>({
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin", "settings", "personal"],
    mutationFn: async (data: IPersonalDetails) => {
      return updateName(data);
    },
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  React.useEffect(() => {
    if (userDetails) {
      for (const key in defaultValues) {
        const typedKey = key as keyof IPersonalDetails;
        if (userDetails.hasOwnProperty(typedKey)) {
          if (
            Array.isArray(defaultValues[typedKey]) &&
            !Array.isArray(userDetails[typedKey])
          ) {
            setValue(typedKey, defaultValues[typedKey]);
            continue;
          }
          setValue(typedKey, userDetails[typedKey]!);
        }
      }
    }
  }, [userDetails, defaultValues, setValue]);

  return (
    <main
      className={cn(
        "flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 overflow-y-scroll p-8",
        isServiceMode("ADMIN") && "h-full",
      )}
    >
      <div className="flex w-[770px] flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Personal Details</h2>
          <p className="leading-4 text-gray-500">Update your profile</p>
        </header>
        <hr />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <p className="font-medium">Upload profile</p>
            <div className="flex flex-row items-center gap-3">
              <div className="h-[80px] w-[80px] rounded-full bg-slate-300">
                <Image
                  className="h-full w-full rounded-full"
                  src={isUrl(null)}
                  width={80}
                  height={80}
                  alt="profile"
                />
              </div>
              <Dialog
                disableOutsideClick
                dialogChild={UploadProfilePictureDialog}
              >
                <Button variant="outline">Upload new profile</Button>
              </Dialog>
              <Dialog dialogChild={DeleteProfilePictureDialog}>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                  <Trash2 className="h-5 w-5" />
                </button>
              </Dialog>
            </div>
          </div>
        </div>
        <hr />
        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-1 flex-col">
              <Input
                label="Admin name"
                placeholder="Micheal"
                {...register("name", { required: true })}
              />
            </div>
          </div>

          <div className="mt-12 flex flex-1 justify-end">
            <Button
              variant="primary"
              isLoading={isPending}
              className="w-fit"
              primaryClassname="w-[130px]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SettingsPersonalView;
