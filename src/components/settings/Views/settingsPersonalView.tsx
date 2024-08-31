import { Input } from "@/components/FormElements";
import TextArea from "@/components/FormElements/TextArea";
import EducationMultiInput from "@/components/FormElements/educationMultiInput";
import MultiInput from "@/components/FormElements/multiInput";
import Button from "@/components/misc/button";
import Dialog from "@/components/misc/dialog";
import { isServiceMode } from "@/constants";
import useZomujoApi from "@/services/zomujoApi";
import { countFilledFields, isUrl } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash2, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DeleteProfilePictureDialog from "../deleteProfilePictureDialog";
import UploadProfilePictureDialog from "../uploadProfilePictureDialog";
import Image from "next/image";

type IPersonalDetails = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  MDCRegistration: string;
  city: string;
  address: string;
  experience: number;
  bio: string;
  languages: string[];
  awards: string[];
  education: {
    degree: string;
    school: string;
  }[];
  schoolsAttended: string[];
  specializations: string[];
};

const SettingsPersonalView = () => {
  const { getUserDetails, patchUserDetails } = useZomujoApi(false).shared;
  const [showBanner, setShowBanner] = useState(false);

  const { data: userDetails } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  const defaultValues: IPersonalDetails = useMemo(
    () => ({
      firstName: userDetails?.firstName ?? "",
      lastName: userDetails?.lastName ?? "",
      email: userDetails?.email ?? "",
      contact: userDetails?.contact ?? "",
      MDCRegistration: userDetails?.MDCRegistration ?? "",
      city: userDetails?.city ?? "",
      address: userDetails?.address ?? "",
      experience: userDetails?.experience ?? 0,
      bio: userDetails?.bio ?? "",
      languages: userDetails?.languages
        ? userDetails?.languages !== null
          ? userDetails?.languages
          : []
        : [],
      awards: userDetails?.awards
        ? userDetails?.awards !== null
          ? userDetails?.awards
          : []
        : [],
      education: userDetails?.education
        ? userDetails?.education !== null
          ? userDetails?.education
          : []
        : [],
      schoolsAttended: userDetails?.schoolsAttended
        ? userDetails?.schoolsAttended !== null
          ? userDetails?.schoolsAttended
          : []
        : [],
      specializations: userDetails?.specializations
        ? userDetails?.specializations !== null
          ? userDetails?.specializations
          : []
        : [],
    }),
    [userDetails],
  );

  const { register, handleSubmit, setValue, watch } = useForm<IPersonalDetails>(
    {
      defaultValues,
    },
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["settings", "personal"],
    mutationFn: async (data: IPersonalDetails) => {
      return patchUserDetails(data);
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

  const { missingFields } = useMemo(() => {
    if (userDetails) {
      const { count, missingFields } = countFilledFields(userDetails)!;
      setShowBanner(missingFields.length > 0);
      return { count, missingFields };
    } else {
      return { count: 1, missingFields: [] };
    }
  }, [userDetails]);

  return (
    <main className="flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 overflow-y-scroll p-8">
      <div className="flex w-[770px] flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Personal Details</h2>
          <p className="leading-4 text-gray-500">Update your profile</p>
        </header>
        <hr />
        {showBanner && (
          <div className="flex flex-row items-center justify-between rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-500">
            <p>Fill out {missingFields.join(", ")} to complete your profile</p>
            <X
              className="ml-2 h-5 w-5 cursor-pointer"
              onClick={() => setShowBanner(false)}
            />
          </div>
        )}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <p className="font-medium">Upload profile</p>
            <div className="flex flex-row items-center gap-3">
              <div className="h-[80px] w-[80px] rounded-full bg-slate-300">
                <Image
                  className="h-full w-full rounded-full"
                  src={isUrl(userDetails?.profilePicture)}
                  width={40}
                  height={40}
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
                label="First Name"
                placeholder="Micheal"
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Input
                label="Last Name"
                placeholder="Micheal Mensah"
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Input
                label="Email"
                placeholder="micheal@ZMR.com"
                {...register("email", { required: true })}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Input
                label="Phone Number"
                placeholder="0501113334"
                {...register("contact", { required: true })}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Input
                label="City"
                placeholder="Accra"
                {...register("city", { required: true })}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Input
                label="Address"
                placeholder="2nd Ponpon Street"
                {...register("address", { required: true })}
              />
            </div>
            {isServiceMode("DOCTOR") && (
              <>
                <div className="flex flex-1 flex-col">
                  <Input
                    label="MDC Registration Number"
                    placeholder="555534567"
                    disabled
                    {...register("MDCRegistration")}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <Input
                    label="Years of Experience"
                    placeholder="2"
                    type="number"
                    {...register("experience", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <TextArea
                    label="Bio"
                    rows={4}
                    placeholder="Tell us about yourself"
                    {...register("bio")}
                  />
                </div>
              </>
            )}
          </div>
          {isServiceMode("DOCTOR") && (
            <div className="my-12 grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <MultiInput
                  label="Languages"
                  dataList={watch("languages") ?? []}
                  setDataList={(value) => {
                    setValue("languages", value);
                  }}
                />
              </div>
              <div>
                <MultiInput
                  label="Awards"
                  dataList={watch("awards") ?? []}
                  setDataList={(value) => {
                    setValue("awards", value);
                  }}
                />
              </div>
              <div>
                <MultiInput
                  label="Specializations"
                  dataList={watch("specializations") ?? []}
                  setDataList={(value) => {
                    setValue("specializations", value);
                  }}
                />
              </div>
              <div>
                <EducationMultiInput
                  label="Education"
                  dataList={watch("education") ?? []}
                  setDataList={(value) => {
                    setValue("education", value);
                  }}
                />
              </div>
            </div>
          )}

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
