"use client";
import AnnouncementsPopover from "@/components/home/announcementsPopover";
import PatientDetailsView from "@/components/patients/patientsDetails";
import PatientDetailsHomeView from "@/components/patients/patientsDetails/patientDetailsHomeView";
import PatientDetailsTabs from "@/components/patients/patientsDetails/patientDetailsTabs";
import React from "react";
import { FiSearch } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function PatientDetails({ params }: { params: { id: string } }) {
  return (
    <div className="h-[calc(100vh-32px)] w-full overflow-clip rounded-2xl border border-gray-100 bg-gray-50">
      <header className="flex w-full flex-col gap-6 border-b border-gray-200 bg-white px-4 pb-4 pt-6">
        <div className="flex flex-row items-center justify-between gap-3">
          <p className="text-xl font-bold">Patients</p>

          <div className="flex flex-row items-center gap-6">
            <button className="">
              <FiSearch className="h-5 w-5" />
            </button>
            <AnnouncementsPopover />
          </div>
        </div>
        <PatientDetailsTabs />
      </header>
      {params.id === "home" ? (
        <PatientDetailsHomeView />
      ) : (
        <PatientDetailsView />
      )}
    </div>
  );
}
