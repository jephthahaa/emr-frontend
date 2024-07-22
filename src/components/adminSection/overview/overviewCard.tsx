"use client";
import React from "react";

const OverviewCard = ({
  title = "TITLE",
  value,
  percentage = 4.4,
}: {
  title?: string;
  value?: number;
  percentage?: number;
}) => {
  return (
    <div className="flex flex-1 flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6">
      <div className="flex flex-row items-start justify-between">
        <p className="font-medium text-gray-500">{title}</p>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium leading-3.5">
            {percentage ?? "-"}%
          </p>
          <p className="text-xs leading-3 text-gray-500">vs last week</p>
        </div>
      </div>
      <p className="text-[38px] font-bold">{value ?? "--"}</p>
    </div>
  );
};

export default OverviewCard;
