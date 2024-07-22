"use client";
import Dialog from "@/components/misc/dialog";
import { isServiceMode } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ConsultationReview from "../consultation/consultationReview";

const PendingReviewOverlay = () => {
  const dispatch = useAppDispatch();
  const reviewData = useAppSelector((state) => state.modal.reviewData);
  const { checkPendingReviews } = useZomujoApi(false).patients;

  const { data: pendingReview } = useQuery({
    enabled: isServiceMode("PATIENT"),
    queryKey: ["check", "pending", "reviews"],
    queryFn: checkPendingReviews,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (pendingReview !== undefined) {
      if (pendingReview.data !== null) {
        dispatch(action.modal.setReviewData(pendingReview.data));
      } else {
        dispatch(action.modal.setReviewData(undefined));
      }
    }
  }, [pendingReview, dispatch]);

  return (
    <Dialog
      isOpen={reviewData !== undefined}
      dialogChild={ConsultationReview}
    />
  );
};

export default PendingReviewOverlay;
