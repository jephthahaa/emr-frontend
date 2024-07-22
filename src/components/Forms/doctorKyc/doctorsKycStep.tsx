import { ZyptykLogo } from "@/assets/images";
import Button from "@/components/misc/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import PersonalDetailsStep from "./personalDetailsStep";
import DoctorIDStep from "./doctorIDStep";
import UploadPhotoStep from "./uploadPhotoStep";
import { cn } from "@/utils";
import { useDoctorSignupContext } from "../contexts/doctorSignupProvider";

const DoctorsKycStep = () => {
  const { currentStep, setCurrentStep } = useDoctorSignupContext();

  const CurrentView = {
    1: <PersonalDetailsStep />,
    2: <DoctorIDStep />,
    3: <UploadPhotoStep />,
  }[currentStep];

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-[#FAFAFA]">
      <header className="relative w-full bg-white px-[72px] py-5">
        <Button
          type="button"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          variant="outline"
          className="gap-1 pl-2"
        >
          <ChevronLeft size={18} /> Back
        </Button>
        <Image
          src={ZyptykLogo}
          className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2"
          alt="Zyptyk Logo"
        />
      </header>
      <div className="mt-[70px] flex w-[610px] flex-col gap-12">
        <div className="flex flex-col gap-3">
          <p className="leading-4">Step {currentStep} of 3</p>
          <div className="flex flex-row items-center justify-between gap-4">
            {Array(3)
              .fill("")
              .map((_, i) => (
                <div
                  key={`progress-${i}`}
                  className={cn(
                    "h-1 w-full duration-150",
                    currentStep >= i + 1 ? "bg-primary" : "bg-gray-200",
                  )}
                />
              ))}
          </div>
        </div>
        {CurrentView}
      </div>
    </div>
  );
};

export default DoctorsKycStep;
