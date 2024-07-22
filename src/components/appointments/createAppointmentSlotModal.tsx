"use client";
import { HotelO1, Video01Icon } from "@/assets/icons";
import { cn } from "@/utils";
import React, { useState } from "react";
import DatePicker from "../misc/datePicker";
import CustomTimePicker from "../misc/customTimePicker";
import Button from "../misc/button";
import { X } from "lucide-react";
import { IAppointmentSlotData } from "@/types";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMinutes, format } from "date-fns";
import LoadingSpinner from "../misc/loadingSpinner";

const appointmentMode = [
  {
    id: "virtual",
    label: "Virtual",
    Icon: Video01Icon,
  },
  {
    id: "visit",
    label: "Visit",
    Icon: HotelO1,
  },
];

const CreateAppointmentSlotModal = ({ onClose }: { onClose: () => void }) => {
  const { postAppointmentSlot } = useZomujoApi(false).doctors.appointments;
  const { getUserDetails } = useZomujoApi(false).shared;
  const queryClient = useQueryClient();
  const [selectedAppointmentMode, setSelectedAppointmentMode] = useState(
    appointmentMode[0].id,
  );
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const onAddSlot = () => {
    if (!startDate || !endDate) return;
    if (startDate.getTime() > endDate.getTime()) return;

    const slotItem: IAppointmentSlotData = {
      date: format(startDate, "yyyy-MM-dd"),
      startTime: format(startDate, "HH:mm:ss"),
      endTime: format(endDate, "HH:mm:ss"),
      type: selectedAppointmentMode as "visit" | "virtual",
    };

    mutate(slotItem);
  };

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["doctors", "appointmentSlot", "add"],
    mutationFn: postAppointmentSlot,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["doctors", "appointmentSlot"],
      });
      onClose();
    },
  });

  const ADD_MINUTES = userDetails!.rate?.lengthOfSession ?? 30;

  return (
    <div className="flex w-[460px] flex-col rounded-lg bg-white p-6">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold">Create Appointment Slot</p>
        <button onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="my-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="font-medium">Appointment</p>
          <div className="flex flex-row gap-4">
            {appointmentMode.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAppointmentMode(option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-2 duration-100",
                  option.id === selectedAppointmentMode
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <option.Icon className="h-4 w-4" />
                <p className="text-sm">{option.label}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Date</p>
          <DatePicker
            date={startDate}
            setDate={(date) => {
              setStartDate(date);
              setEndDate(date);
            }}
          />
        </div>
        <div className="flex h-[66px] flex-row gap-4">
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSpinner size={40} />
            </div>
          )}
          {userDetails && (
            <>
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-medium">From</p>
                <CustomTimePicker
                  disabled={startDate === undefined}
                  date={startDate}
                  setDate={(date) => {
                    setStartDate(date);
                    let modifiedDate = addMinutes(date!, ADD_MINUTES);
                    setEndDate(modifiedDate);
                    // if (endDate && endDate.getTime() < date!.getTime()) {
                    // }
                  }}
                  className="flex flex-1"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-medium">To</p>
                <CustomTimePicker
                  disabled
                  date={endDate}
                  setDate={setEndDate}
                  className="flex flex-1"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Button
        onClick={onAddSlot}
        variant="primary"
        isLoading={isPending}
        primaryClassname="px-4"
      >
        Add slot
      </Button>
    </div>
  );
};

export default CreateAppointmentSlotModal;
