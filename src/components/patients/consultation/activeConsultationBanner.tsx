"use client";
import { isServiceMode } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import socket from "@/services/socketIO";
import useZomujoApi from "@/services/zomujoApi";
import { IRecord } from "@/types";
import { cn, wait } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const ActiveConsultationBanner = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const path = usePathname();
  const { getActiveConsultation } = useZomujoApi(false).shared;

  const { data: activeConsultationData } = useQuery({
    enabled: !isServiceMode("ADMIN"),
    queryKey: ["consultation", "active"],
    queryFn: getActiveConsultation,
    refetchOnWindowFocus: false,
  });

  const activeConsultation = activeConsultationData?.data;

  useEffect(() => {
    const run = async () => {
      if (activeConsultation !== undefined) {
        callToast(activeConsultation);
        if (activeConsultation) {
          dispatch(
            action.consultation.setActiveConsultationDetails({
              id: activeConsultation.id,
              userId: activeConsultation.user.id,
            }),
          );
          if (path.includes("/patients") || path.includes("/messages")) {
            await wait(3000);
          } else {
            await wait(3000);
            if (isServiceMode("DOCTOR")) {
              dispatch(
                action.consultation.setCurrentStep(
                  activeConsultation.currentStep,
                ),
              );
              router.replace(
                `/patients/${activeConsultation.user.id}/consultation`,
              );
            }
          }
        } else {
          dispatch(action.consultation.setActiveConsultationDetails(undefined));
          await wait(3000);
        }
      }
    };

    run();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConsultation, router]);

  useEffect(() => {
    socket.on("ConsultationEventAction", (data) => {
      if (data.type === "start") {
        dispatch(
          action.consultation.setActiveConsultationDetails({
            id: data.id,
            userId: data.userId,
          }),
        );
      }
      if (data.type === "end") {
        dispatch(action.consultation.setActiveConsultationDetails(undefined));
      }
      callConsultationToast(data.type);
    });

    return () => {
      socket.off("ConsultationEventAction");
    };
  }, [dispatch]);

  return <></>;
};

const callToast = (activeConsultation: IRecord | false) => {
  return toast.custom(
    (t) => (
      <div
        key={"active-consultation-banner"}
        className={cn(
          "flex h-16 w-[290px] items-center rounded-xl border border-gray-200 bg-white shadow-sm",
          t.visible ? "animate-enter" : "animate-leave",
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center">
          {activeConsultation !== undefined &&
            typeof activeConsultation === "boolean" && (
              <CheckCircle className="h-8 w-8 text-gray-500" />
            )}
          {activeConsultation !== undefined &&
            typeof activeConsultation !== "boolean" && (
              <CheckCircle className="h-8 w-8 text-primary" />
            )}
        </div>
        <div className="flex flex-1 items-center">
          <p className="text-sm text-gray-600">
            {activeConsultation !== undefined &&
              typeof activeConsultation === "boolean" &&
              "No active consultation"}
            {activeConsultation !== undefined &&
              typeof activeConsultation !== "boolean" && (
                <>
                  {`Consultation session with`} <br />{" "}
                  {`${activeConsultation.user.firstName} ${activeConsultation.user.lastName} still active.`}
                </>
              )}
          </p>
        </div>
      </div>
    ),
    {
      duration: 6000,
    },
  );
};

const callConsultationToast = (type: string) => {
  return toast.custom(
    (t) => (
      <div
        key={`${t.id}-con`}
        className={cn(
          "flex h-16 w-[290px] items-center rounded-xl border border-gray-200 bg-white shadow-sm",
          t.visible ? "animate-enter" : "animate-leave",
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-1 items-center">
          <p className="text-sm text-gray-600">
            {type === "start" && "Consultation Started"}
            {type === "end" && "Consultation Ended"}
          </p>
        </div>
      </div>
    ),
    {
      duration: 5000,
    },
  );
};

export default ActiveConsultationBanner;
