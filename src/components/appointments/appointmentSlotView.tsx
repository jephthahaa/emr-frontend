"use client";
import React, { useState } from "react";
import DateSelector from "../misc/dateSelector";
import Button from "../misc/button";
import AppointmentCalender from "./appointmentCalender";
import CreateAppointmentSlotModal from "./createAppointmentSlotModal";
import LoadingProgressBar from "../misc/loadingProgressBar";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { setDateTime } from "@/utils";
import { IAppointmentSlot } from "@/types";
import { addWeeks, format, subWeeks } from "date-fns";
import Dialog from "../misc/dialog";

enum ADD_MODAL_STATE {
  NONE,
  LOADING,
  IDLE,
  SUCCESS,
  ERROR,
}

const AppointmentSlotView = () => {
  const [addModalState, setAddModalState] = useState(ADD_MODAL_STATE.NONE);
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
    <>
      <Dialog
        isOpen={addModalState !== ADD_MODAL_STATE.NONE}
        setIsOpen={() => {
          setAddModalState(ADD_MODAL_STATE.NONE);
        }}
        disableOutsideClick
        dialogChild={CreateAppointmentSlotModal}
      />
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
          <div>
            <Button
              onClick={() => setAddModalState(ADD_MODAL_STATE.IDLE)}
              variant="primary"
              primaryClassname="px-4"
            >
              Add slot
            </Button>
          </div>
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

export default AppointmentSlotView;
