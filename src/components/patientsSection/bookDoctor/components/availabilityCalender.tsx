"use client";
import { Button } from "@/components/ui/button";
import { DAYS_OF_WEEK_SHORT } from "@/constants";
import { cn } from "@/utils";
import {
  addMonths,
  format,
  getDaysInMonth,
  isEqual,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const AvailabilityCalender = ({
  slots,
  selectedDate,
  setSelectedDate,
}: {
  slots: Date[];
  selectedDate?: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const TOTAL_DAYS = getDaysInMonth(currentDate);
  const FIRST_DAY = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const BEGINING_SPACES = FIRST_DAY.getDay();

  const isToday = (day: number) =>
    today.getDate() === day + 1 &&
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();

  return (
    <div className="flex min-h-[410px] w-full flex-col gap-6 rounded-xl border border-gray-200 p-8">
      <div className="flex flex-row items-center justify-between">
        <p className="text-lg font-bold leading-4.5">
          {format(currentDate, "MMMM")}{" "}
          <span className="text-gray-500">{format(currentDate, "yyyy")}</span>
        </p>
        <div className="flex flex-row items-center gap-4">
          <Button
            onClick={() => {
              setCurrentDate(subMonths(currentDate, 1));
            }}
            variant="outline"
            size="icon"
            className="h-6 w-6"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            onClick={() => {
              setCurrentDate(addMonths(currentDate, 1));
            }}
            variant="outline"
            size="icon"
            className="h-6 w-6"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-7 place-items-center">
          {DAYS_OF_WEEK_SHORT.map((day) => (
            <div key={day} className="flex w-8 items-center justify-center">
              <p>{day}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 place-items-center gap-y-2">
          {Array(BEGINING_SPACES)
            .fill("")
            .map((_, day) => (
              <div
                key={`date-b-space-${day}`}
                className="flex h-8 w-8 items-center justify-center rounded-md"
              >
                <p></p>
              </div>
            ))}
          {Array(TOTAL_DAYS)
            .fill("")
            .map((_, day) => {
              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day + 1,
                0,
                0,
                0,
                0,
              );

              const isAvailable = Boolean(
                slots.find((slot) => isEqual(slot, date)),
              );

              return (
                <div
                  key={`date-${date.getTime()}`}
                  onClick={() => {
                    if (isEqual(date, selectedDate!)) {
                      setSelectedDate(undefined);
                    } else {
                      setSelectedDate(date);
                    }
                  }}
                  className={cn(
                    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md duration-100",
                    !isToday(day) && "hover:bg-primaryLight",
                    isAvailable &&
                      "bg-primaryLight text-black hover:bg-primary hover:text-white",
                    isToday(day) && "bg-[#FAEBE3] text-warning-600",
                    isEqual(date, selectedDate!) &&
                      "bg-primary text-white hover:bg-primaryLight hover:text-black",
                  )}
                >
                  <p>{day + 1}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex h-8 flex-row items-center justify-evenly">
        <div className="flex flex-row gap-2.5">
          <div className="h-3 w-3 rounded-full bg-primaryLight"></div>
          <p className="text-sm leading-3.5 text-gray-500">Available slots</p>
        </div>
        <div className="flex flex-row gap-2.5">
          <div className="h-3 w-3 rounded-full bg-warning-600"></div>
          <p className="text-sm leading-3.5 text-gray-500">Today</p>
        </div>
        <div className="flex flex-row gap-2.5">
          <div className="h-3 w-3 rounded-full bg-primary"></div>
          <p className="text-sm leading-3.5 text-gray-500">Selected Day</p>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalender;
