import OverviewCard from "@/components/adminSection/overview/overviewCard";
import DoctorsTableView from "@/components/adminSection/users/doctorsTableView";
import useZomujoApi from "@/services/zomujoApi";
import React from "react";

export default async function Doctors() {
  const zomujoApi = useZomujoApi(true).admin;

  const totalDoctors = await zomujoApi.getTotalDoctors();
  const activeDoctors = await zomujoApi.getActiveDoctors();
  const pendingDoctors = await zomujoApi.getPendingDoctors();

  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="">
        <p className="text-[38px] font-bold leading-[38px]">
          Registered Doctors
        </p>
      </div>
      <div className="flex w-full flex-row gap-7">
        <OverviewCard title="Total Doctors" value={totalDoctors.data} />
        <OverviewCard title="Active Doctors" value={activeDoctors.data} />
        <OverviewCard title="Pending Doctors" value={pendingDoctors.data} />
      </div>
      <DoctorsTableView />
    </div>
  );
}
