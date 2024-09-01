import CustomText from "@/components/misc/CustomText";
import Link from "next/link";
import { LoginForm } from "@/components/Forms";
import { LoginSlide } from "@/assets/images";
import React from "react";
import { cn } from "@/utils";
import { isServiceMode } from "@/constants";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function Login() {
  return (
    <main
      className={cn(
        "flex h-screen w-full flex-row p-5",
        isServiceMode("ADMIN") ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "relative hidden h-full w-1/2 flex-col justify-end overflow-clip rounded-[22px] bg-gray-400 lg:flex",
        )}
      >
        <Image
          src={LoginSlide}
          className="absolute z-0 h-full w-full object-cover object-center"
          alt={"login slide"}
          layout="fill"
        />
        <div className="z-10 w-full space-y-6 bg-transparentPrimaryGradient px-7 py-20 text-white 2xl:px-10 2xl:py-24">
          <h3 className="text-4xl font-bold">
            Elevate patient care with seamless access to their health data.
          </h3>

          <CustomText size="body">
            Effortlessly manage patient data, appointments, and communications
            online, giving you control and convenience.
          </CustomText>
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center">
          <LoginForm />
        </div>

        <div className="mt-5 flex flex-col justify-center px-4 text-center text-sm sm:flex-row sm:gap-6">
          <p className="text-sm">© 2023 Zyptyk. All rights reserved.</p>

          <div className="space-x-1 text-primaryDark">
            <Link href="/">Terms & Conditions</Link>
            <span className="text-black">|</span>
            <Link href="/">Privacy & Policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
