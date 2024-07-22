import AppointmentsTableView from "@/components/adminSection/appointments/appointmentsTableView";
import OverviewCard from "@/components/adminSection/overview/overviewCard";
import useZomujoApi from "@/services/zomujoApi";
import React from "react";

export default async function Appointments() {
  const zomujoApi = useZomujoApi(true).admin;

  const totalAppointments = await zomujoApi.getTotalAppointments();
  const declinedAppointments = await zomujoApi.getDeclinedAppointments();
  const pendingAppointments = await zomujoApi.getPendingAppointments();

  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="">
        <p className="text-[38px] font-bold leading-[38px]">Appointments</p>
      </div>
      <div className="flex w-full flex-row gap-7">
        <OverviewCard
          title="Total Appointments"
          value={totalAppointments.data.total}
        />
        <OverviewCard
          title="Declined Appointments"
          value={declinedAppointments.data}
        />
        <OverviewCard
          title="Pending Appointments"
          value={pendingAppointments.data}
        />
      </div>
      <AppointmentsTableView />
    </div>
  );
}
