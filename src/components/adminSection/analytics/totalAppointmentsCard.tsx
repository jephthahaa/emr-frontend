"use client";
import useZomujoApi from "@/services/zomujoApi";
import { IApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AreaChart } from "@tremor/react";
import React from "react";

const TotalAppointmentsCard = ({
  initialData,
}: {
  initialData?: IApiResponse<{
    total: number;
    appointments: {
      date: string;
      count: number;
    }[];
  }>;
}) => {
  const { getTotalAppointments } = useZomujoApi(false).admin;

  const { data } = useQuery({
    queryKey: ["admin", "appointments"],
    queryFn: getTotalAppointments,
    initialData: initialData,
  });

  const chartData = data?.data?.appointments.map((item) => ({
    date: item.date,
    count: item.count,
  }));

  return (
    <div className="flex h-[270px] flex-1 flex-col justify-between gap-2 overflow-clip rounded-2xl border border-gray-100 bg-white">
      <div className="flex flex-row items-start justify-between px-8 pt-8">
        <div className="flex flex-col">
          <p className="text-xl font-bold">Appointments</p>
          <p className="text-gray-500">Total Appointments</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[38px] font-bold leading-[38px]">
            {data?.data.total || 0}
          </p>
        </div>
      </div>
      <div className="flex h-[176px] flex-1">
        <AreaChart
          className="-mx-2 h-[176px] w-[104%]"
          data={chartData || []}
          index="date"
          // yAxisWidth={65}
          showGridLines={false}
          categories={["count"]}
          colors={["green"]}
          showXAxis={false}
          showYAxis={false}
          intervalType="equidistantPreserveStart"
          showLegend={false}
        />
      </div>
    </div>
  );
};

export default TotalAppointmentsCard;
