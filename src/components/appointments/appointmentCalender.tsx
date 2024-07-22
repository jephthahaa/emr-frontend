"use client";
import { DAYS_OF_WEEK } from "@/constants";
import { cn } from "@/utils";
import React from "react";
import AppointmentCard from "./appointmentCard";
import TimeIndicator from "./timeIndicator";
import { IAppointmentSlot } from "@/types";
import { AnimatePresence } from "framer-motion";

type AppointmentCalenderProps = {
  className?: string;
  slots?: IAppointmentSlot[];
};
const AppointmentCalender = ({
  className,
  slots = [],
}: AppointmentCalenderProps) => {
  const selectedDay = (new Date().getDay() + 6) % 7;

  return (
    <div
      className={cn(
        "relative flex h-[calc(100vh-220px)] flex-row overflow-scroll border-t border-gray-200 scrollbar-none",
        className,
      )}
    >
      <AnimatePresence>
        {slots.map((slot) => (
          <AppointmentCard
            key={slot.id}
            id={slot.id}
            startDate={new Date(slot.startDate)}
            endDate={new Date(slot.endDate)}
            mode={slot.mode}
            status={slot.status}
            patient={slot.patient}
          />
        ))}
      </AnimatePresence>
      <div className="sticky left-0 z-10 flex h-max w-[80px] shrink-0 flex-col border-r border-gray-200 bg-white text-sm">
        <TimeIndicator />
        <div className="sticky top-0 z-[11] flex h-10 w-full shrink-0 items-center justify-center border-b border-gray-200 bg-white">
          GMT
        </div>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="relative h-[60px] shrink-0">
            {i !== 0 && (
              <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                {i > 12 ? i - 12 : i} {i >= 12 ? "PM" : "AM"}
              </p>
            )}
          </div>
        ))}
      </div>
      {DAYS_OF_WEEK.map((day, i) => (
        <div
          key={day}
          className="flex h-max w-[260px] shrink-0 flex-col border-r border-gray-200 text-sm"
        >
          <div
            className={cn(
              "sticky top-0 z-[9] flex h-10 w-full shrink-0 items-center justify-center gap-1.5 border-b border-gray-200 bg-white",
              i === selectedDay &&
                "border-b-2 border-primaryDark font-bold text-primaryDark",
            )}
          >
            {i === selectedDay && (
              <div className="h-2 w-2 rounded-full bg-primaryDark"></div>
            )}
            <p>{day}</p>
          </div>
          {Array.from({ length: 24 }).map((_, j) => (
            <div
              key={j}
              className={cn(
                "relative z-[5] h-[60px] shrink-0 border-b border-gray-200 bg-gray-50",
                i === selectedDay && "bg-primaryLight",
              )}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AppointmentCalender;
