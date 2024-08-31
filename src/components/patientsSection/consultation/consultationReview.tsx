"use client";
import React, { useState } from "react";
import { Button as ShadButton } from "@/components/ui/button";
import { StepOneView, StepThreeView, StepTwoView } from "./views";
import { cn } from "@/utils";
import Image from "next/image";
import { ZMRLogo } from "@/assets/images";
import { useMutation } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useAppSelector } from "@/hooks";
import Button from "@/components/misc/button";

const ConsultationReview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const revew = useAppSelector((state) => state.modal.reviewData!);
  const { patchReview } = useZomujoApi(false).patients;

  const StepElement = {
    0: <StepOneView setCurrentStep={setCurrentStep} />,
    1: <StepTwoView setCurrentStep={setCurrentStep} />,
    2: <StepThreeView setCurrentStep={setCurrentStep} />,
  }[currentStep];

  const m = useMutation({
    mutationKey: ["consultation", "review", "submit"],
    mutationFn: () =>
      patchReview(revew.id, {
        rating: 0,
      }),
  });
  return (
    <div className="relative flex h-screen w-screen flex-col items-center overflow-y-scroll bg-white">
      <Image src={ZMRLogo} className="my-14 h-14 w-14" alt="ZMR Logo" />
      <div
        className={cn(
          "flex flex-col rounded-2xl border border-gray-200 p-8",
          currentStep > 0 ? "w-[575px]" : "w-[670px]",
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="font-medium leading-4">STEP {currentStep + 1} OF 3</p>
          <Button
            variant="outline"
            isLoading={m.isPending}
            onClick={() => {
              m.mutate();
            }}
            className="h-10 min-w-[88px] border-none bg-error-50 px-6 text-error-500 hover:bg-error-75"
          >
            Leave
          </Button>
        </div>
        {StepElement}
      </div>
    </div>
  );
};

export default ConsultationReview;
