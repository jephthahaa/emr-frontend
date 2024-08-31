"use client";
import { FormHelper, Input } from "../FormElements";
import CustomText from "../misc/CustomText";
import Image from "next/image";
import Button from "../misc/button";
import Dialog from "../misc/dialog";
import DoctorsKycStep from "./doctorKyc/doctorsKycStep";
import { useDoctorSignupContext } from "./contexts/doctorSignupProvider";

export const SignUpForm = () => {
  const {
    handleSubmit,
    onSubmit,
    currentStep,
    register,
    errors,
    isLoading,
    error,
  } = useDoctorSignupContext();

  return (
    <>
      <form
        className="w-full max-w-[405px] p-4 sm:p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Dialog
          isOpen={currentStep >= 1 && currentStep < 4}
          dialogChild={() => <DoctorsKycStep />}
        />
        <Image
          src="/icon-512x512.png"
          width={44}
          height={44}
          alt="ZMR-logo"
        />

        <div className="space-y-5 2xl:space-y-[32px]">
          <legend className="mt-6 2xl:mt-[42px] 2xl:space-y-[18px]">
            <h4 className="text-3xl font-bold">Doc, Get Started 😁</h4>
            <CustomText className="text-grayscale-500">
              Create an account using your work email
            </CustomText>
          </legend>

          <div className="flex flex-row gap-2">
            <div>
              <Input
                label="First Name"
                id="firstName"
                placeholder="Michael"
                {...register("firstName", {
                  required: "FirstName is required",
                })}
              />
              {errors.firstName && (
                <FormHelper type="error">{errors.firstName.message}</FormHelper>
              )}
            </div>
            <div>
              <Input
                label="Last Name"
                id="lastName"
                placeholder="Mensah"
                {...register("lastName", { required: "Name is required" })}
              />
              {errors.lastName && (
                <FormHelper type="error">{errors.lastName.message}</FormHelper>
              )}
            </div>
          </div>

          <div>
            <Input
              label="Email"
              id="email"
              placeholder="ZMR@gmail.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <FormHelper type="error">{errors.email.message}</FormHelper>
            )}
          </div>

          <div>
            <Input
              label="Password"
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Min. 8 characters"
            />
            {errors.password && (
              <FormHelper type="error">{errors.password.message}</FormHelper>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={Boolean(errors.password || errors.email || isLoading)}
          >
            Create Account
          </Button>
          {error !== null && <FormHelper type="error">{error}</FormHelper>}
        </div>
      </form>
    </>
  );
};
