"use client";
import Combobox from "@/components/misc/combobox";
import useZomujoApi from "@/services/zomujoApi";
import { IApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AreaChart } from "@tremor/react";
import { format } from "date-fns";
import React from "react";

const DailyActiveCard = ({
  initialData,
}: {
  initialData?: IApiResponse<
    {
      date: string;
      count: string;
    }[]
  >;
}) => {
  const { getDailyActiveUsers } = useZomujoApi(false).admin;

  const { data } = useQuery({
    queryKey: ["admin", "dailyActive"],
    queryFn: getDailyActiveUsers,
    initialData: initialData,
  });

  const chartData = data?.data?.map((item) => ({
    date: format(new Date(item.date), "dd MMM"),
    count: parseInt(item.count),
  }));

  const today = chartData?.[chartData.length - 1]?.count || 0;

  const thisWeek = chartData
    ?.slice(-7)
    .reduce((acc, item) => acc + item.count, 0);

  const total = chartData?.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="flex h-[466px] flex-1 flex-col justify-between gap-2 rounded-2xl border border-gray-100 bg-white p-8">
      <div className="flex flex-row items-center justify-between">
        <p className="font-medium text-gray-500">Daily active</p>
        <Combobox
          options={[{ value: "1", label: "Today" }]}
          value=""
          setValue={() => {}}
        />
      </div>
      <div className="flex h-[274px] flex-1">
        <AreaChart
          className="h-[274px]"
          data={chartData || []}
          index="date"
          yAxisWidth={20}
          categories={["count"]}
          colors={["orange"]}
          intervalType="equidistantPreserveStart"
          showLegend={false}
        />
      </div>
      <div className="flex flex-row gap-12">
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-[32px] font-bold">{today}</p>
          <p className="text-gray-500">Active users today</p>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-[32px] font-bold">{thisWeek}</p>
          <p className="text-gray-500">Active users this week</p>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-[32px] font-bold">{total}</p>
          <p className="text-gray-500">Active users last month</p>
        </div>
      </div>
    </div>
  );
};

export default DailyActiveCard;
