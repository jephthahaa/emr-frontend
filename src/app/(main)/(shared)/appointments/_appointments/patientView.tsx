"use client";
import AppointmentTabs from "@/components/appointments/appointmentTabs";
import AnnouncementsPopover from "@/components/home/announcementsPopover";
import PatientPastAppointmentView from "@/components/patientsSection/appointments/patientPastAppointmentView";
import PatientRequestAppointmentView from "@/components/patientsSection/appointments/patientRequestsAppointmentView";
import PatientUpcomingAppointmentView from "@/components/patientsSection/appointments/patientUpcomingAppointmentView";
import useZomujoApi from "@/services/zomujoApi";
import { useQueries } from "@tanstack/react-query";
import React, { useState } from "react";

const tabs = [
  {
    name: "Upcoming Appointments",
    count: 3,
  },
  {
    name: "Past  Appointments",
    count: 0,
  },
  {
    name: "Requests",
    count: 3,
  },
];

export default function PatientsAppointmentsView() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const {
    getAppointmentRequests,
    getUpcomingAppointments,
    getPastAppointments,
  } = useZomujoApi(false).patients;

  const [
    { data: upcomingAppointments, isLoading: upcomingLoading },
    { data: appointmentRequests, isLoading: requestLoading },
    { data: pastAppointments, isLoading: pastLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["patients", "upcoming", "appointments"],
        queryFn: getUpcomingAppointments,
      },
      {
        queryKey: ["patients", "appointments", "requests"],
        queryFn: getAppointmentRequests,
      },
      {
        queryKey: ["patients", "past", "appointments"],
        queryFn: getPastAppointments,
      },
    ],
  });

  const PatientAppointmentView = {
    [tabs[0].name]: (
      <PatientUpcomingAppointmentView
        data={upcomingAppointments?.data}
        isLoading={upcomingLoading}
      />
    ),
    [tabs[1].name]: (
      <PatientPastAppointmentView
        data={pastAppointments?.data}
        isLoading={pastLoading}
      />
    ),
    [tabs[2].name]: (
      <PatientRequestAppointmentView
        data={appointmentRequests?.data}
        isLoading={requestLoading}
      />
    ),
  }[selectedTab];

  return (
    <div className="h-[calc(100vh-32px)] w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="relative flex w-full flex-row items-center justify-between p-6 pb-4">
        <p className="text-3xl font-bold">Appointments</p>

        <div className="flex flex-row items-center gap-3">
          <AnnouncementsPopover />
        </div>
      </header>
      <nav className="p-6 py-4">
        <AppointmentTabs
          tabs={tabs}
          float={false}
          counts={[
            upcomingAppointments?.data.length ?? 0,
            pastAppointments?.data.length ?? 0,
            appointmentRequests?.data.length ?? 0,
          ]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </nav>
      {PatientAppointmentView}
    </div>
  );
}
