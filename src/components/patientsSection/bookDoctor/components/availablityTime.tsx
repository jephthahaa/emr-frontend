import { cn } from "@/utils";
import React from "react";

const AvailablityTime = ({
  selectedSlot,
  setSelectedSlot,
  availableTimes,
}: {
  availableTimes: {
    id: string;
    startTime: string;
    endTime: string;
  }[];
  selectedSlot: string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-7">
      <p className="text-xl font-bold leading-5">
        Available time (Africa/Accra - GMT (+00:00))
      </p>
      <div className="grid grid-cols-3 gap-3">
        {availableTimes.map((time) => (
          <div
            key={time.id}
            onClick={() => setSelectedSlot(time.id)}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-md border-[1.5px] py-2 duration-100",
              time.id === selectedSlot ? "border-gray-400" : "border-gray-300",
            )}
          >
            <p className="font-medium leading-4">
              {time.startTime} - {time.endTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablityTime;
