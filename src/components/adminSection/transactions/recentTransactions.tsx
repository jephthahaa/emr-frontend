"use client";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { isUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const RecentTransactions = () => {
  const { getTransactions } = useZomujoApi(false).admin;

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "recent-transactions"],
    queryFn: () =>
      getTransactions({
        limit: 4,
        page: 1,
        sort: "date.DESC",
      }),
  });

  const transactions = data?.data ?? [];

  return (
    <div className="flex h-[300px] flex-1 flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 pb-0">
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold leading-5">Recent Transactions</p>
      </div>
      <hr />
      <div className="flex flex-1 flex-col gap-1">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-between">
            <LoadingSpinner />
          </div>
        )}
        {transactions.map((item) => (
          <div key={item.id} className="grid h-10 grid-cols-4">
            <div className="flex w-max shrink-0 flex-row items-center gap-2">
              <div className="h-[26px] w-[26px] shrink-0 rounded-full bg-gray-500">
                <Image
                  className="h-full w-full rounded-full"
                  src={isUrl(item.patient.profilePicture)}
                  width={28}
                  height={28}
                  alt="profile"
                />
              </div>
              <p className="text-sm text-gray-500">
                {item.patient.firstName} {item.patient.lastName}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center">
              <p className="text-sm text-gray-500">
                ₵ {item.amount.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center">
              <p className="text-sm text-gray-500">{item.type}</p>
            </div>
            <div className="flex flex-row items-center justify-end">
              <div className="flex h-6 items-center justify-center rounded-full bg-[#F0FDF4] px-3 text-primaryDark">
                <p className="text-sm">{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
