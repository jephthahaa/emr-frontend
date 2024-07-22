"use client";
import React, { useState } from "react";
import DateSelector from "../misc/dateSelector";
import AppointmentCalender from "./appointmentCalender";
import CreateAppointmentSlotModal from "./createAppointmentSlotModal";
import LoadingProgressBar from "../misc/loadingProgressBar";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { setDateTime } from "@/utils";
import { IAppointmentSlot } from "@/types";
import { addWeeks, format, subWeeks } from "date-fns";

enum ADD_MODAL_STATE {
  NONE,
  LOADING,
  IDLE,
  SUCCESS,
  ERROR,
}

const AppointmentUpcomingSlotView = () => {
  const [addModalState, setAddModalState] = useState(ADD_MODAL_STATE.NONE);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { getUpcomingAppointments } = useZomujoApi(false).doctors.appointments;
  const { data: appointmentSlotsData, isLoading } = useQuery({
    queryKey: [
      "doctors",
      "upcoming",
      "appointments",
      selectedDate.toISOString().split("T")[0],
    ],
    queryFn: () =>
      getUpcomingAppointments(selectedDate.toISOString().split("T")[0]),
  });

  const slots = appointmentSlotsData?.data || [];
  const adjustedSlots: IAppointmentSlot[] = slots.map((slot) => {
    const startDate = setDateTime(
      new Date(slot.appointmentDate),
      slot.startTime,
    );
    const endDate = setDateTime(new Date(slot.appointmentDate), slot.endTime);

    const slotData = {
      id: slot.id,
      mode: slot.type,
      startDate,
      endDate,
      status: slot.status,
      patient: slot.patient,
    };

    return slotData;
  });

  return (
    <>
      {addModalState !== ADD_MODAL_STATE.NONE && (
        <CreateAppointmentSlotModal
          onClose={() => {
            setAddModalState(ADD_MODAL_STATE.NONE);
          }}
        />
      )}
      <div className="mx-6 mb-6 flex flex-1 flex-col overflow-clip rounded-xl border border-gray-200 bg-white">
        <div className="relative flex w-full flex-row items-center justify-between p-6 pb-4">
          <DateSelector
            value={format(selectedDate, "dd MMMM yyyy")}
            onDecrement={() => {
              setSelectedDate(subWeeks(selectedDate, 1));
            }}
            onIncrement={() => {
              setSelectedDate(addWeeks(selectedDate, 1));
            }}
          />
          <div className="h-10"></div>
          <LoadingProgressBar
            key={selectedDate.toISOString()}
            isDone={isLoading}
            className="absolute bottom-0 left-0 w-full"
          />
        </div>

        <AppointmentCalender slots={adjustedSlots} />
      </div>
    </>
  );
};

export default AppointmentUpcomingSlotView;
