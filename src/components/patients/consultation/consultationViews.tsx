"use client";
import { useAppSelector } from "@/hooks";
import React from "react";
import ConsultationSymptomsView from "./views/symptoms";
import ConsultationLabView from "./views/lab";
import ConsultationDiagnoseNPrescribeView from "./views/diagnoseNprescribe";
import ConsultationReviewView from "./views/review";
import ConsultationSidebar from "./consultationSidebar";

const ConsultationViews = () => {
  const currentStep = useAppSelector((state) => state.consultation.currentStep);

  return (
    <div className="flex h-[calc(100vh-32px-166px)] flex-row justify-between bg-grayscale-10">
      {
        {
          0: <ConsultationSymptomsView />,
          1: <ConsultationLabView />,
          2: <ConsultationDiagnoseNPrescribeView />,
          3: <ConsultationReviewView />,
        }[currentStep]
      }
      <ConsultationSidebar />
    </div>
  );
};

export default ConsultationViews;
