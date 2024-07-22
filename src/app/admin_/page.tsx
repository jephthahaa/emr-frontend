import DailyActiveCard from "@/components/adminSection/analytics/dailyActiveCard";
import NewUserCard from "@/components/adminSection/analytics/newUserCard";
import OverviewCard from "@/components/adminSection/overview/overviewCard";
import { TransactionsMiniTableView } from "@/components/adminSection/overview/transactionsMiniTable";
import useZomujoApi from "@/services/zomujoApi";
import React from "react";

export default async function Admin() {
  const {
    getTotalUsers,
    getTotalDoctors,
    getTotalPatients,
    getDailyActiveUsers,
    getMonthlyNewUsers,
  } = useZomujoApi(true).admin;

  const totalUser = await getTotalUsers();
  const totalDoctors = await getTotalDoctors();
  const totalPatients = await getTotalPatients();
  const dailyActiveUsers = await getDailyActiveUsers();
  const monthlyNewUsers = await getMonthlyNewUsers();

  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="gap-3">
        <p className="text-[38px] font-bold">Good morning</p>
        <p className="text-gray-500">Track everything here</p>
      </div>
      <div className="flex w-full flex-row gap-7">
        <OverviewCard title="Total Users" value={totalUser.data} />
        <OverviewCard title="Total Doctors" value={totalDoctors.data} />
        <OverviewCard title="Total Patients" value={totalPatients.data} />
      </div>
      <div className="flex flex-row gap-7">
        <DailyActiveCard initialData={dailyActiveUsers} />
        <NewUserCard initialData={monthlyNewUsers} />
      </div>
      <TransactionsMiniTableView />
    </div>
  );
}
