"use client";
import Button from "@/components/misc/button";
import React, { useEffect, useState } from "react";
import AvailabilityCalender from "./components/availabilityCalender";
import AvailablityTime from "./components/availablityTime";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { cn } from "@/utils";
import { isEqual } from "date-fns";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { isServiceMode } from "@/constants";

const StepOneView = ({
  setCurrentStep,
  standalone = false,
  rescheduleData,
  onClose,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  standalone?: boolean;
  rescheduleData?: {
    requestId: number;
    doctorId: string;
  };
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState<undefined | Date>();
  const { id } = useParams<{ id: string }>();
  const {
    patients: { getAppointmentSlots, patchRescheduleAppointmentRequest },
    doctors,
  } = useZomujoApi(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      "patient",
      "appointmentSlots",
      standalone ? rescheduleData?.doctorId : id,
    ],
    queryFn: () => {
      if (standalone) {
        if (isServiceMode("DOCTOR")) {
          return doctors.appointments.getAppointmentSlots();
        } else {
          return getAppointmentSlots(rescheduleData?.doctorId!);
        }
      } else {
        return getAppointmentSlots(id);
      }
    },
  });

  const appointmentSlots = data?.data ?? [];

  const arrayOfSlots = appointmentSlots.map((slot) => {
    const date = new Date(slot.date);
    return date;
  });

  const isSelectedAvailable = Boolean(
    arrayOfSlots.find((slot) => isEqual(slot, selectedDate!)),
  );

  const availableTimes = appointmentSlots
    .filter((slot) => {
      const date = new Date(slot.date);
      return isEqual(date, selectedDate!);
    })
    .map((slot) => {
      return {
        id: slot.id,
        startTime: slot.startTime.slice(0, 5),
        endTime: slot.endTime.slice(0, 5),
      };
    })
    .sort((a, b) => {
      const aTime = a.startTime.split(":");
      const bTime = b.startTime.split(":");
      return Number(aTime[0]) - Number(bTime[0]);
    });

  const { mutate, isPending } = useMutation({
    mutationKey: ["appointment", "reschedule", rescheduleData?.requestId],
    mutationFn: async () => {
      if (isServiceMode("DOCTOR")) {
        return doctors.appointments.patchRescheduleAppointmentRequest({
          slotId: selectedSlot,
          requestId: rescheduleData?.requestId!,
        });
      } else {
        return patchRescheduleAppointmentRequest({
          slotId: selectedSlot,
          requestId: rescheduleData?.requestId!,
        });
      }
    },
    onSuccess: async () => {
      toast.success("Appointment recheduled");
      await queryClient.invalidateQueries({
        queryKey: ["patients", "appointments", "requests"],
      });

      onClose && onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  useEffect(() => {
    setSelectedSlot("");
  }, [selectedDate]);

  return (
    <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-8">
      <p className="mb-8 text-xl font-bold leading-5">
        Choose available Date & Time
      </p>
      <div
        className={cn(
          "flex min-h-[565px] flex-col gap-8",
          isLoading && "items-center justify-center",
        )}
      >
        {isLoading && <LoadingSpinner />}
        {data && (
          <>
            <AvailabilityCalender
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              slots={arrayOfSlots}
            />
            <AvailablityTime
              availableTimes={availableTimes}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          </>
        )}
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <div></div>
        <div className="flex flex-row gap-2">
          {standalone && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button
            disabled={
              !selectedDate ||
              !isSelectedAvailable ||
              selectedSlot === "" ||
              isPending
            }
            isLoading={isLoading}
            onClick={() => {
              if (standalone) {
                mutate();
              } else {
                setCurrentStep((p) => p + 1);
                dispatch(action.appointment.setSelectedSlotId(selectedSlot));
              }
            }}
            variant="primary"
            className="w-fit"
            primaryClassname="px-6"
          >
            {standalone ? "Save" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepOneView;
