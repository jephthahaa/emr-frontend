import AllUsersCard from "@/components/adminSection/analytics/allUsersCard";
import DailyActiveCard from "@/components/adminSection/analytics/dailyActiveCard";
import NewUserCard from "@/components/adminSection/analytics/newUserCard";
import TotalAppointmentsCard from "@/components/adminSection/analytics/totalAppointmentsCard";
import OverviewCard from "@/components/adminSection/overview/overviewCard";
import { TransactionsMiniTableView } from "@/components/adminSection/overview/transactionsMiniTable";
import useZomujoApi from "@/services/zomujoApi";
import React from "react";

export default async function Analytics() {
  const zomujoApi = useZomujoApi(true).admin;

  const totalUser = await zomujoApi.getTotalUsers();
  const totalDoctors = await zomujoApi.getTotalDoctors();
  const totalPatients = await zomujoApi.getTotalPatients();
  const dailyActiveUsers = await zomujoApi.getDailyActiveUsers();
  const monthlyNewUsers = await zomujoApi.getMonthlyNewUsers();
  const removedUsers = await zomujoApi.getRemovedUsers();
  const pendingUsers = await zomujoApi.getPendingUsers();
  const totalAppointments = await zomujoApi.getTotalAppointments();

  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="">
        <p className="text-[38px] font-bold leading-[38px]">Analytics</p>
      </div>
      <div className="flex w-full flex-row gap-7">
        <OverviewCard title="Total Users" value={totalUser.data} />
        <OverviewCard title="Removed users" value={removedUsers.data} />
        <OverviewCard title="Pending users" value={pendingUsers.data} />
      </div>
      <div className="flex flex-row gap-7">
        <AllUsersCard
          doctors={totalDoctors.data}
          patients={totalPatients.data}
        />
        <TotalAppointmentsCard initialData={totalAppointments} />
      </div>
      <div className="flex flex-row gap-7">
        <NewUserCard initialData={monthlyNewUsers} />
        <DailyActiveCard initialData={dailyActiveUsers} />
      </div>
      <TransactionsMiniTableView />
    </div>
  );
}
