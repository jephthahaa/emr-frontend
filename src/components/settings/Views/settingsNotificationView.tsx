"use client";
import { Checkbox } from "@/components/FormElements";
import Button from "@/components/misc/button";
import ToggleButton from "@/components/misc/toggleButton";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type INotificationDetails = {
  status: boolean;
  email: boolean;
  records: boolean;
  messages: boolean;
  appointments: boolean;
};

const SettingsNotificationView = () => {
  const { getUserDetails, patchUserDetails } = useZomujoApi(false).shared;

  const { data: userDetails } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  const defaultValues = useMemo(
    () => ({
      status: userDetails?.notifications?.status ?? false,
      email: userDetails?.notifications?.email ?? false,
      records: userDetails?.notifications?.records ?? false,
      messages: userDetails?.notifications?.messages ?? false,
      appointments: userDetails?.notifications?.appointments ?? false,
    }),
    [userDetails],
  );

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["settings", "notifications"],
    mutationFn: async (data: INotificationDetails) => {
      return patchUserDetails({ notifications: data });
    },
    onSuccess: () => {
      toast.success("Notifications updated successfully");
    },
  });

  React.useEffect(() => {
    if (userDetails) {
      for (const key in defaultValues) {
        const typedKey = key as keyof INotificationDetails;
        if (userDetails.notifications) {
          if (userDetails.notifications.hasOwnProperty(typedKey)) {
            setValue(typedKey, userDetails.notifications[typedKey]);
          }
        }
      }
    }
  }, [userDetails, defaultValues, setValue]);

  return (
    <main className="flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 p-8">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="flex w-[770px] flex-col gap-7"
      >
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Notifications</h2>
          <p className="leading-4 text-gray-500">
            Stay in the loop! Receive updates, and important news directly to
            your inbox.
          </p>
        </header>
        <hr />
        <div className="flex w-[668px] flex-row gap-20">
          <div className="flex flex-col gap-2.5">
            <p className="font-medium leading-4">Email Notifications</p>
            <p className="leading-[25px] text-gray-500">
              Manage your preferences anytime to tailor your email experience.
            </p>
          </div>
          <div className="flex w-[325px] shrink-0 flex-col gap-8">
            <div className="flex flex-row items-center gap-2">
              <ToggleButton
                toggled={watch("email")}
                setToggled={(value) => setValue("email", value)}
                size={24}
                variant="secondary"
              />
              <p>{watch("email") ? "On" : "Off"}</p>
            </div>
            <div className="flex flex-col gap-11">
              <div className="flex flex-row gap-3.5">
                <Checkbox
                  {...register("appointments")}
                  className="h-5 w-5 rounded data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <div className="flex flex-col gap-2.5">
                  <p className="font-medium leading-4">Appointments</p>
                  <p className="leading-[25px] text-gray-500">
                    Stay informed about your appointments hassle-free
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3.5">
                <Checkbox
                  {...register("messages")}
                  className="h-5 w-5 rounded data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <div className="flex flex-col gap-2.5">
                  <p className="font-medium leading-4">Messages</p>
                  <p className="leading-[25px] text-gray-500">
                    Receive updates, communicate with ease, and stay informed
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3.5">
                <Checkbox
                  {...register("records")}
                  className="h-5 w-5 rounded data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <div className="flex flex-col gap-2.5">
                  <p className="font-medium leading-4">File record requests</p>
                  <p className="leading-[25px] text-gray-500">
                    Receive notifications whenever your doctors send record
                    requests
                  </p>
                </div>
              </div>
            </div>
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
    </main>
  );
};

export default SettingsNotificationView;
