"use client";
// import Chip from "@/components/misc/chip";
import { IDoctor } from "@/types";
import { isUrl } from "@/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DoctorCard = ({ doctor }: { doctor: IDoctor }) => {
  const router = useRouter();
  return (
    <div className="flex h-[226px] w-[360px] shrink-0 flex-col gap-2 rounded-[14px] border border-gray-200 bg-white p-5">
      <div className="flex flex-col">
        <div className="mb-4 flex flex-row gap-3 ">
          <div className="h-14 w-14 rounded-full bg-gray-400">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(doctor.profilePicture)}
              width={56}
              height={56}
              alt="profile"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">
              Dr. {`${doctor?.firstName} ${doctor?.lastName}`}
            </p>
            <p className="text-sm font-medium text-gray-400">
              {doctor?.specializations
                ? doctor.specializations[0]
                : "General Practitioner"}
            </p>
          </div>
        </div>
        <div className="mb-6 flex flex-row gap-6">
          <div className="flex h-fit w-fit flex-row items-center gap-1 rounded-full border border-gray-100 px-1.5 py-1 shadow-xs">
            <Star size={14} className="fill-warning-300 text-warning-300" />
            <p className="text-xs leading-3">{doctor.ratings}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-1.5">
              <div className="h-[5px] w-[5px] rounded-full bg-primary"></div>
              <p className="text-sm leading-[14px]">
                {doctor?.experience ?? 1} years of experience
              </p>
            </div>
            <div className="flex flex-row items-center gap-1.5">
              <div className="h-[5px] w-[5px] rounded-full bg-primary"></div>
              <p className="text-sm leading-[14px]">
                {doctor.noOfConsultations} consultations
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-row gap-2">
          <div className="w-fit shrink-0 rounded-full bg-grayscale-75 px-2.5 py-0.5 text-gray-400">
            <p className="text-xs font-medium">Hepatitis A</p>
          </div>
          <div className="w-fit shrink-0 rounded-full bg-grayscale-75 px-2.5 py-0.5 text-gray-400">
            <p className="text-xs font-medium">Peptic Ulcer</p>
          </div>
          <div className="w-fit shrink-0 rounded-full bg-grayscale-75 px-2.5 py-0.5 text-gray-400">
            <p className="text-xs font-medium">Esophagitis.</p>
          </div>
          <Chip varient="yellow" text="+4" />
        </div> */}
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-xl font-bold leading-5 text-primaryDark">
            GHs {doctor?.rate?.amount}/
          </p>
          <p className="text-sm font-medium leading-[14px] text-gray-400">
            Consult
          </p>
        </div>
        <button
          onClick={() => router.push(`/doctors/${doctor.id}`)}
          className="h-10 w-[175px] rounded-md border border-gray-300 bg-white text-sm text-black duration-100 hover:bg-gray-50"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
