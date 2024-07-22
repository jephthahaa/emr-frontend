import React from "react";
import Button from "@/components/misc/button";
import DoctorDetailsImage from "@/components/patientsSection/doctorsDetails/doctorDetailsImage";
import DoctorDetailsInfo from "@/components/patientsSection/doctorsDetails/doctorDetailsInfo";
import getZomujoApi from "@/services/zomujoApi";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const DoctorDetails = async ({ params }: { params: { id: string } }) => {
  const { getDoctorDetails } = getZomujoApi(true).patients;
  let doctor = null;

  try {
    const doctorBase = await getDoctorDetails(params.id);
    doctor = doctorBase.data;
  } catch (error) {
    return notFound();
  }

  if (!doctor) {
    return notFound();
  }

  return (
    <div className="h-[calc(100vh-32px)] w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="relative flex w-full flex-row items-center justify-between p-6 pb-4">
        <Link href="/discover">
          <Button variant="outline" className="gap-1 bg-gray-100 pl-1.5">
            <ChevronLeft size={22} />
            Back
          </Button>
        </Link>
      </header>
      <section className="flex w-full flex-row gap-6 p-6 pt-4">
        <DoctorDetailsImage doctor={doctor} />
        <DoctorDetailsInfo doctor={doctor} />
      </section>
    </div>
  );
};

export default DoctorDetails;
