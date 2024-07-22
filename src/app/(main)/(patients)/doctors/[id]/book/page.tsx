"use client";
import Button from "@/components/misc/button";
import ProgressBar from "@/components/misc/progressBar";
import {
  StepOneView,
  StepTwoView,
  StepThreeView,
} from "@/components/patientsSection/bookDoctor";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function DoctorBooking({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0);

  const StepElement = {
    0: <StepOneView setCurrentStep={setCurrentStep} />,
    1: <StepTwoView setCurrentStep={setCurrentStep} />,
    2: <StepThreeView setCurrentStep={setCurrentStep} />,
  }[currentStep];

  return (
    <div className="h-[calc(100vh-32px)] w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="relative flex w-full flex-row items-center justify-between p-6 pb-4">
        <Link href={`/doctors/${params.id}`}>
          <Button variant="outline" className="gap-1 bg-gray-100 pl-1.5">
            <ChevronLeft size={22} />
            Back
          </Button>
        </Link>
      </header>
      <section className="flex h-[calc(100vh-116px)] flex-col items-center">
        <div className="flex w-[514px] flex-col gap-8">
          <div className="flex flex-row items-center justify-between">
            <p className="font-medium leading-4">STEP {currentStep + 1} OF 3</p>
            <ProgressBar
              progress={(currentStep + 1) / 3}
              color="#10b932"
              className="w-[210px]"
            />
          </div>
          <div className="h-[calc(100vh-32px-130px)] overflow-y-scroll pb-8">
            {StepElement}
          </div>
        </div>
      </section>
    </div>
  );
}
