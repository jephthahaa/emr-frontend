import AnnouncementsPopover from "@/components/home/announcementsPopover";
import PatientVitalsCard from "@/components/patients/patientsDetails/patientInfoCards/patientVitalsCard";
import DoctorCard from "@/components/patientsSection/home/doctorCard";
import SearchDoctorsCard from "@/components/patientsSection/home/searchDoctorsCard";
import UpcomingAppointmentCard from "@/components/patientsSection/home/upcomingAppointmentCard";
import { auth } from "@/lib/auth";
import getZomujoApi from "@/services/zomujoApi";
import { isUrl } from "@/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const PatientsHomeView = async () => {
  const user = (await auth()).getUser()!;

  const { getTopDoctors } = getZomujoApi(true).patients;

  const topDoctorsBase = (await getTopDoctors({})).data;

  const topDoctors = (topDoctorsBase ?? []).slice(0, 2);
  const suggestedDoctors = topDoctorsBase ?? [];

  return (
    <div className="h-full w-full overflow-y-scroll rounded-2xl border border-gray-100 bg-gray-50">
      <header className="flex w-full flex-row items-center justify-between px-6 pb-4 pt-6">
        <div className="flex flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-600">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(user.patient.profilePicture)}
              width={40}
              height={40}
              alt="profile"
            />
          </div>
          <div className="flex h-full flex-col justify-between">
            <p className="text-xs text-gray-500">
              Good morning, {user.firstName} 👋
            </p>
            <p className="text-xl font-bold">How you feeling today?</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <AnnouncementsPopover />
        </div>
      </header>
      <section className="flex w-full flex-row gap-6 p-6">
        <div className="flex w-[750px] flex-col gap-12">
          <SearchDoctorsCard />
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <p className="text-xl font-bold leading-5">Top Doctors</p>
              <Link
                href="/discover"
                className="flex flex-row items-center text-sm"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              {topDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <p className="text-xl font-bold leading-5">Suggested Doctors</p>
              <Link
                href="/discover"
                className="flex flex-row items-center text-sm"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              {suggestedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <UpcomingAppointmentCard />
          <PatientVitalsCard patient={user.patient} />
        </div>
      </section>
    </div>
  );
};

export default PatientsHomeView;
