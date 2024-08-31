import CustomText from "@/components/misc/CustomText";
import Link from "next/link";
import { LoginSlide } from "@/assets/images";
import React from "react";
import { SignUpForm } from "@/components/Forms/SignupForm";
import DoctorSignupProvider from "@/components/Forms/contexts/doctorSignupProvider";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function SignUp() {
  return (
    <main className="flex h-screen w-full flex-row p-5">
      <div
        style={{
          backgroundImage: `url(${LoginSlide.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="hidden h-full w-1/2 flex-col justify-end overflow-clip rounded-[22px] bg-gray-400 lg:flex"
      >
        <div className="w-full space-y-6 bg-transparentPrimaryGradient px-7 py-20 text-white 2xl:px-10 2xl:py-24">
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
        <div className="flex flex-1 items-center justify-center">
          <DoctorSignupProvider>
            <SignUpForm />
          </DoctorSignupProvider>
        </div>

        <div className="mt-5 flex flex-col justify-center px-4 text-center text-sm sm:flex-row sm:gap-6">
          <p className="text-sm">© 2024 ZMR. All rights reserved.</p>

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
