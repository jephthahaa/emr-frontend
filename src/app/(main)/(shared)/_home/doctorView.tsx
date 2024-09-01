"use client";
import AnnouncementsPopover from "@/components/home/announcementsPopover";
import AppointmentRequestsPanel from "@/components/home/appointmentRequestsPanel";
import TodaysAppointmentPanel from "@/components/home/todaysAppointmentPanel";
import TreatedPatientsSection from "@/components/home/treatedPatientsSection";

import { isUrl } from "@/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

const DoctorsHomeView = () => {
  const session = useSession().data;
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="flex w-full flex-row items-center justify-between px-6 pb-4 pt-6">
        <div className="flex flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-600">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(session?.user.doctor?.profilePicture)}
              width={40}
              height={40}
              alt="profile"
            />
          </div>
          <div className="flex h-full flex-col justify-between">
            <p className="text-xs text-gray-500">
              Welcome Dr. {session?.user.lastName} 👋
            </p>
            <p className="text-xl font-bold">Good Morning</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <AnnouncementsPopover />
        </div>
      </header>
      <section className="flex w-full flex-col gap-4 p-6">
        <div className="flex w-full flex-row gap-4">
          <TodaysAppointmentPanel />
          <AppointmentRequestsPanel />
        </div>
        <TreatedPatientsSection />
      </section>
    </div>
  );
};

export default DoctorsHomeView;
