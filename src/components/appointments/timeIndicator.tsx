"use client";
import { cn } from "@/utils";
import React, { useEffect, useState } from "react";

const TimeIndicator = () => {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());

  const totalHours = (hour * 60 + minute) / 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date().getHours());
      setMinute(new Date().getMinutes());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        top: 40 + totalHours * 60,
        left: 40,
        width: 40 + 260 * 7,
      }}
      className={cn("absolute z-[10] h-0.5 bg-primary")}
    >
      <div className="absolute -left-5 top-1/2 z-50  -translate-y-1/2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-white">
        {hour > 12 ? hour - 12 : hour}:{minute < 10 ? "0" + minute : minute}
      </div>
    </div>
  );
};

export default TimeIndicator;
