"use client";
import AppointmentRequestView from "@/components/appointments/appointmentRequestView";
import AppointmentSlotView from "@/components/appointments/appointmentSlotView";
import AppointmentTabs from "@/components/appointments/appointmentTabs";
import AppointmentUpcomingSlotView from "@/components/appointments/appointmentUpcomingSlotView";
import AnnouncementsPopover from "@/components/home/announcementsPopover";
import useZomujoApi from "@/services/zomujoApi";
import { useQueries } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const tabs = [
  {
    name: "Appointment slots",
    count: 0,
  },
  {
    name: "Upcoming",
    count: 1,
  },
  {
    name: "Requests",
    count: 3,
  },
];

export default function DoctorsAppointmentsView() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  const { getAppointmentRequests, getUpcomingAppointments } =
    useZomujoApi(false).doctors.appointments;

  const [{ data: appointmentRequestsData }, { data: upcomingAppointments }] =
    useQueries({
      queries: [
        {
          queryKey: ["doctors", "appointmentRequests"],
          queryFn: () => getAppointmentRequests({ limit: 25 }),
        },
        {
          queryKey: ["doctors", "upcoming", "appointments"],
          queryFn: () => getUpcomingAppointments(),
        },
      ],
    });

  const AppointmentView = {
    "Appointment slots": <AppointmentSlotView />,
    Upcoming: <AppointmentUpcomingSlotView />,
    Requests: <AppointmentRequestView />,
  };

  return (
    <div className="h-[calc(100vh-32px)] w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="relative flex w-full flex-row items-center justify-between p-6 pb-4">
        <p className="text-xl font-bold">Appointments</p>

        <AppointmentTabs
          tabs={tabs}
          counts={[
            0,
            upcomingAppointments?.data.length ?? 0,
            appointmentRequestsData?.data.filter(
              (item) => item.status === "pending",
            ).length ?? 0,
          ]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div className="flex flex-row items-center gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 bg-white p-3">
            <FiSearch className="h-5 w-5" />
          </button>
          <AnnouncementsPopover />
        </div>
      </header>

      {AppointmentView[selectedTab as keyof typeof AppointmentView]}
    </div>
  );
}
