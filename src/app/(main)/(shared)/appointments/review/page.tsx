"use client";
import Dialog from "@/components/misc/dialog";
import ConsultationReview from "@/components/patientsSection/consultation/consultationReview";
import { useAppSelector } from "@/hooks";
import React from "react";

const AppointmentReview = () => {
  const reviewData = useAppSelector((state) => state.modal.reviewData!);

  return (
    <div className="flex h-[calc(100vh-32px)] w-full items-center justify-center rounded-2xl border border-gray-100 bg-gray-50">
      <p className="text-4xl">
        {reviewData !== undefined ? "Nothing to review here" : "Review Ongoing"}
      </p>
      <Dialog
        isOpen={reviewData !== undefined}
        dialogChild={ConsultationReview}
      />
    </div>
  );
};

export default AppointmentReview;
