import OverviewCard from "@/components/adminSection/overview/overviewCard";
import PatientsTableView from "@/components/adminSection/users/patientsTableView";
import useZomujoApi from "@/services/zomujoApi";
import React from "react";

export default async function Patients() {
  const zomujoApi = useZomujoApi(true).admin;

  const totalPatients = await zomujoApi.getTotalPatients();
  const activePatients = await zomujoApi.getActivePatients();
  const deletedPatients = await zomujoApi.getRemovedUsers();

  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="">
        <p className="text-[38px] font-bold leading-[38px]">
          Registered Patients
        </p>
      </div>
      <div className="flex w-full flex-row gap-7">
        <OverviewCard title="Total Patients" value={totalPatients.data} />
        <OverviewCard title="Active Patients" value={activePatients.data} />
        <OverviewCard title="Deleted Patients" value={deletedPatients.data} />
      </div>
      <PatientsTableView />
    </div>
  );
}
