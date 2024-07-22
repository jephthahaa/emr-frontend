"use client";
import Combobox from "@/components/misc/combobox";
import useZomujoApi from "@/services/zomujoApi";
import { IApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "@tremor/react";
import { format } from "date-fns";
import React from "react";

const NewUserCard = ({
  initialData,
}: {
  initialData?: IApiResponse<
    {
      month: string;
      count: string;
    }[]
  >;
}) => {
  const { getMonthlyNewUsers } = useZomujoApi(false).admin;

  const { data } = useQuery({
    queryKey: ["admin", "monthly-users"],
    queryFn: getMonthlyNewUsers,
    initialData: initialData,
  });

  const chartData = data?.data?.map((item) => ({
    month: format(new Date(item.month), "MMM"),
    count: parseInt(item.count),
  }));

  return (
    <div className="flex h-[466px] w-[435px] flex-col justify-between gap-2 rounded-2xl border border-gray-100 bg-white p-8">
      <div className="flex flex-row items-center justify-between">
        <p className="font-medium text-gray-500">New users</p>
        <Combobox
          options={[{ value: "1", label: "Today" }]}
          value=""
          setValue={() => {}}
        />
      </div>
      <div className="h-[274px]">
        <BarChart
          className="h-[274px]"
          data={chartData ?? []}
          index="month"
          categories={["count"]}
          colors={["blue"]}
          showLegend={false}
        />
      </div>
      <div className="flex flex-row gap-12">
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-[32px] font-bold">10</p>
          <p className="text-gray-500">New users today</p>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-[32px] font-bold">300</p>
          <p className="text-gray-500">New users this week</p>
        </div>
      </div>
    </div>
  );
};

export default NewUserCard;
