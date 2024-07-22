"use client";
import Button from "@/components/misc/button";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getActiveConsultation } = useZomujoApi(false).shared;

  const { data: activeConsultationData, isLoading } = useQuery({
    queryKey: ["consultation", "active", id],
    queryFn: getActiveConsultation,
    refetchOnWindowFocus: false,
  });

  const activeConsultation = activeConsultationData?.data;

  useEffect(() => {
    if (activeConsultation) {
      dispatch(
        action.consultation.setActiveConsultationDetails({
          id: activeConsultation.id,
          userId: activeConsultation.user.id,
        }),
      );
      if (activeConsultation.user.id !== id) {
        dispatch(
          action.consultation.setCurrentStep(activeConsultation.currentStep),
        );
        router.replace(`/patients/${activeConsultation.user.id}/consultation`);
      }
    } else {
      dispatch(action.consultation.setActiveConsultationDetails(undefined));
    }
  }, [activeConsultation, dispatch, id, router]);

  return (
    <div className="h-[calc(100vh-32px)] w-full overflow-clip rounded-2xl border border-gray-100 bg-gray-50">
      {isLoading && (
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <LoadingSpinner size={54} stroke={4} />
        </div>
      )}
      {activeConsultation && children}
      {!activeConsultation && (
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <div className="space-y-3">
            <p className="text-2xl text-gray-500">No active consultation</p>
            <Button onClick={() => router.replace("/patients")}>
              Go back to patients
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
