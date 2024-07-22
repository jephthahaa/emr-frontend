import Image from "next/image";
import React from "react";
import { isUrl } from "@/utils";
import { IDoctor } from "@/types";
import { Star } from "lucide-react";
import Chip from "../misc/chip";

function DoctorProfile() {
  const doctor: IDoctor = {
    notifications: {
      email: true,
      status: true,
      records: true,
      messages: true,
      appointments: true,
    },
    languages: ["English Language"],
    id: "b666b79a-d68b-430b-8e62-9494dc520c5r",
    email: "brian@zomujo.com",
    isActive: true,
    profilePicture:
      "/opt/render/project/src/public/uploads/doctors/1717804685103-CRWqTLkyaWYz9EOY.jpg",
    firstName: "Brian",
    lastName: "Joestar",
    MDCRegistration: "MDCRN498923",
    dob: "2024-01-02",
    gender: "male",
    contact: "0205556666",
    address: "P.O. Box 1234",
    city: "Accra",
    qualifications: ["MBChB", "KNUST"],
    specializations: ["General Practitioner"],
    experience: null,
    verification_status: "unverified",
    education: null,
    bio: null,
    awards: null,
    IDs: {
      back: "/opt/render/project/src/public/uploads/doctors/1717804685103-IMG_6523 2.jpg",
      front:
        "/opt/render/project/src/public/uploads/doctors/1717804685046-IMG_0722.jpg",
    },
    rate: null,
    paymentMethods: [],
    schoolsAttended: [],
    isFavourite: false,
    ratings: 5,
    noOfConsultations: 0,
    recentConsultDate: null,
  };
  return (
    <div className="h-[calc(100vh-186px)] overflow-scroll px-6 pb-6">
      <div className="flex flex-row flex-wrap items-start justify-start gap-6">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex h-[276px] w-[276px] shrink-0 flex-col justify-between gap-2 rounded-[14px] border border-gray-200 bg-white p-5 shadow-2xl"
            >
              <div className="flex flex-col">
                <div className="mb-4 flex flex-row gap-3 ">
                  <div className="h-14 w-14 shrink-0 rounded-full bg-gray-400">
                    <Image
                      className="h-full w-full shrink-0 rounded-full"
                      src={isUrl(doctor.profilePicture)}
                      width={56}
                      height={56}
                      alt="profile"
                    />
                  </div>
                  <div className="flex w-full flex-col justify-center border-b">
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
                    <Star
                      size={14}
                      className="fill-warning-300 text-warning-300"
                    />
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
                <div className="flex flex-row gap-2">
                  <div className="w-fit shrink-0 rounded-full bg-grayscale-75 px-2.5 py-0.5 text-gray-400">
                    <p className="text-xs font-medium">Hepatitis A</p>
                  </div>

                  <div className="w-fit shrink-0 rounded-full bg-grayscale-75 px-2.5 py-0.5 text-gray-400">
                    <p className="text-xs font-medium">Esophagitis.</p>
                  </div>
                  <Chip varient="yellow" text="+4" />
                </div>
              </div>

              <button
                // onClick={() => router.push(`/doctors/${doctor.id}`)}
                className="h-10 w-full rounded-md border border-gray-300 bg-white text-sm text-black duration-100 hover:bg-gray-50"
              >
                Refer doctor
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DoctorProfile;
