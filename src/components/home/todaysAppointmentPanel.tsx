"use client";
import React, { useState } from "react";
import Chip from "../misc/chip";
import DateSelector from "../misc/dateSelector";
import { Input } from "../FormElements";
import { FiSearch } from "react-icons/fi";
import AppointmentCalender from "../appointments/appointmentCalender";
import { setDateTime } from "@/utils";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { IAppointmentSlot } from "@/types";
import { addWeeks, format, subWeeks } from "date-fns";
import LoadingProgressBar from "../misc/loadingProgressBar";

const TodaysAppointmentPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { getAppointmentSlots } = useZomujoApi(false).doctors.appointments;
  const { data: appointmentSlotsData, isLoading } = useQuery({
    queryKey: ["doctors", "appointmentSlot", selectedDate],
    queryFn: () =>
      getAppointmentSlots(selectedDate.toISOString().split("T")[0]),
  });

  const slots = appointmentSlotsData?.data || [];
  const adjustedSlots: IAppointmentSlot[] = slots.map((slot) => {
    const startDate = setDateTime(new Date(slot.date), slot.startTime);
    const endDate = setDateTime(new Date(slot.date), slot.endTime);

    const slotData = {
      id: slot.id,
      mode: slot.type,
      startDate,
      endDate,
      status: slot.status,
    };

    return slotData;
  });

  return (
    <div className="flex w-[calc(100vw-316px-264px-48px-16px-16px)] flex-col overflow-clip rounded-2xl border border-gray-200 bg-white">
      <div className="relative flex flex-col gap-8 border-b border-gray-200 p-6">
        <div className="flex flex-row items-center gap-2.5">
          <p className="text-2xl font-bold">Today&apos;s Appointments</p>
          <Chip text={`${adjustedSlots.length} slots`} varient="yellow" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <DateSelector
            value={format(selectedDate, "dd MMMM yyyy")}
            onDecrement={() => {
              setSelectedDate(subWeeks(selectedDate, 1));
            }}
            onIncrement={() => {
              setSelectedDate(addWeeks(selectedDate, 1));
            }}
          />
          <div></div>
          {/* <Input
            className="bg-gray-10 w-[330px] border-gray-200"
            icon={<FiSearch className="h-5 w-5" />}
            placeholder="Search Appointments"
          /> */}
        </div>
        <LoadingProgressBar
          isDone={isLoading}
          className="absolute bottom-0 left-0 w-full"
        />
      </div>
      <AppointmentCalender
        className="h-[calc(100vh-356px)]"
        slots={adjustedSlots}
      />
    </div>
  );
};

export default TodaysAppointmentPanel;
