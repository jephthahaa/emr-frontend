"use client";
import { Checkbox, FormHelper, Input } from "../FormElements";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomText from "../misc/CustomText";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "../misc/button";
import { isServiceMode } from "@/constants";

type FormFields = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const [, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const redirectPath = useSearchParams().get("redirect") ?? "/";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setisLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result?.error);
      }

      if (result?.ok && !result?.error) {
        router.push(redirectPath);
      }
    } catch (err) {
      setError((err as { message: string }).message);
      setisLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-[405px] p-4 sm:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image src="/icon-512x512.png" width={44} height={44} alt="ZMR-logo" />

      <div className="space-y-5 2xl:space-y-[32px]">
        <legend className="mt-6 2xl:mt-[42px] 2xl:space-y-[18px]">
          {isServiceMode("PATIENT") && (
            <h4 className="text-3xl font-bold">Welcome to ZMR 😁</h4>
          )}
          {isServiceMode("DOCTOR") && (
            <h4 className="text-3xl font-bold">Welcome back Dr. 😁</h4>
          )}
          {isServiceMode("ADMIN") && (
            <h4 className="text-3xl font-bold">Admin Login</h4>
          )}
          <CustomText className="text-grayscale-500">
            {isServiceMode("ADMIN")
              ? "Login Admin"
              : "Login to your account to get started"}
          </CustomText>
        </legend>

        <div>
          <Input
            label="Email"
            id="email"
            placeholder={"Enter your email"}
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

        <div className="flex justify-between">
          <Checkbox
            onClick={() => setRememberMe((prev) => !prev)}
            labelText="Remember me"
          />

          <Link href="/" className="text-primaryDark">
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={Boolean(errors.password || errors.email || isLoading)}
        >
          Login
        </Button>
        {isServiceMode("DOCTOR") && (
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primaryDark">
              Click here!
            </Link>
          </p>
        )}
        {error !== null && <FormHelper type="error">{error}</FormHelper>}
      </div>
    </form>
  );
};
