/* eslint-disable react/no-unescaped-entities */
import { Input } from "@/components/FormElements";
import { Button as ShadButton } from "@/components/ui/button";
import Button from "@/components/misc/button";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { z } from "zod";
import Dialog from "@/components/misc/dialog";
import DeleteAccountDialog from "../deleteAccountDialog";

type ISecurity = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const formSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const SettingsSecurityView = () => {
  const { resetPassword } = useZomujoApi(false).shared;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISecurity>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["settings", "security"],
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
      reset();
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
    <main className="flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 p-8">
      <div className="flex w-[770px] flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Security</h2>
          <p className="leading-4 text-gray-500">Change your password</p>
        </header>
        <hr />
        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="flex w-[630px] flex-col gap-8"
        >
          <div>
            <Input
              label="Current Password"
              {...register("currentPassword", { required: true })}
              autoComplete="current-password"
              type="password"
              error={errors.currentPassword}
              placeholder="Min. 8 characters"
            />
          </div>
          <div>
            <Input
              label="New Password"
              {...register("newPassword", { required: true })}
              autoComplete="new-password"
              type="password"
              error={errors.newPassword}
              placeholder="Min. 8 characters"
            />
          </div>
          <div>
            <Input
              label="Confirm new password"
              {...register("confirmPassword", { required: true })}
              type="password"
              error={errors.confirmPassword}
              placeholder="Min. 8 characters"
            />
          </div>
          <div className="mt-4 flex flex-1 justify-end">
            <Button
              variant="primary"
              isLoading={isPending}
              className="w-fit"
              primaryClassname="w-[130px]"
            >
              Save Changes
            </Button>
          </div>
          <div className="flex flex-row items-center gap-16">
            <div className="flex flex-col gap-2.5">
              <h2 className="text-lg font-bold leading-[18px]">
                Delete account
              </h2>
              <p className="text-sm leading-[28px] text-gray-500">
                We'll delete your account and data permanently. Thanks for being
                part of Zyptyk! You're always welcome back if you change your
                mind.
              </p>
            </div>
            <div className="flex flex-row items-center gap-2.5">
              <Dialog dialogChild={DeleteAccountDialog}>
                <ShadButton
                  type="button"
                  variant="destructive"
                  className="bg-error-50 text-error-500 hover:bg-error-100"
                >
                  Delete Account
                </ShadButton>
              </Dialog>
              <ShadButton type="button" variant="outline">
                Learn More
              </ShadButton>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SettingsSecurityView;
