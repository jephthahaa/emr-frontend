"use client";
import { CheckmarkBadge02Icon, Share01Icon } from "@/assets/icons";
import Button from "@/components/misc/button";
import useZomujoApi from "@/services/zomujoApi";
import { IDoctor } from "@/types";
import { cn } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsMortarboard } from "react-icons/bs";

const DoctorDetailsInfo = ({ doctor }: { doctor: IDoctor }) => {
  const [isFavorite, setisFavorite] = useState(doctor.isFavourite);
  const { postToggleFavouriteDoctor } = useZomujoApi(false).patients;

  const { mutate } = useMutation({
    mutationKey: ["patients", "toggleFavoriteDoctor", doctor.id],
    mutationFn: () => postToggleFavouriteDoctor(doctor.id),
    onSuccess: () => {
      toast.success(
        `Doctor ${isFavorite ? "added to" : "removed from"} favourites`,
      );
    },
    onError: (error) => {
      setisFavorite(!isFavorite);
      toast.error("Failed to add doctor to favourites");
    },
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {doctor.verification_status === "verified" && (
            <div className="mb-4 flex w-fit flex-row gap-2 rounded-full bg-success-75 px-4 py-2 text-primaryDark">
              <CheckmarkBadge02Icon className="h-5 w-5" />
              <p className="text-sm font-medium">Doctor Verified</p>
            </div>
          )}
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-2xl font-bold leading-6">
              Dr. {`${doctor.firstName} ${doctor.lastName}`}
            </p>
            <p className="font-medium leading-4 text-gray-400">
              {doctor?.specializations
                ? doctor.specializations[0]
                : "General Practitioner"}
            </p>
          </div>
          <div className="mb-6 flex flex-row gap-5">
            <div className="flex flex-row items-center gap-1.5">
              <p className="leading-3">💼</p>
              <p>{doctor.experience} years of experience</p>
            </div>
            <div className="flex flex-row items-center gap-1.5">
              {doctor.noOfConsultations > 50 && <p className="leading-3">🤩</p>}
              <p>
                {doctor.noOfConsultations > 0 ? doctor.noOfConsultations : "no"}{" "}
                consultations
              </p>
            </div>
          </div>
          {doctor.specializations && (
            <div className="flex flex-row gap-2">
              {doctor.specializations.map((item) => (
                <div
                  key={item}
                  className="w-fit shrink-0 rounded-full bg-grayscale-75 px-2.5 py-0.5 text-gray-400"
                >
                  <p className="text-xs font-medium">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex h-10 flex-row items-center gap-3">
          <Button
            onClick={() => {
              setisFavorite(!isFavorite);
              mutate();
            }}
            variant="outline"
            className="h-10 w-10 px-0 text-gray-500 hover:bg-gray-200"
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFavorite && "fill-red-600 text-red-500",
              )}
            />
          </Button>
          <Button
            variant="outline"
            className="h-10 w-10 px-0 text-gray-500 hover:bg-gray-200"
          >
            <Share01Icon className="h-5 w-5" />
          </Button>
          <Link href={`/doctors/${doctor.id}/book`}>
            <Button variant="primary" primaryClassname="px-4">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex h-[calc(100vh-32px-120px-204px-64px-16px)] flex-col gap-12 overflow-scroll">
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold leading-5">Bio</p>
          <p className="leading-6 text-gray-500">{doctor.bio}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold leading-5">Education</p>
          <div className="flex flex-col gap-5">
            {doctor.education?.map((item, i) => (
              <div key={i} className="flex flex-row items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-100 text-orange-400">
                  <BsMortarboard className="h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-gray-600">{item.degree}</p>
                  <p className="text-sm font-medium text-gray-500">
                    {item.school}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-row items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-100 text-orange-400">
                <BsMortarboard className="h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-bold text-gray-600">
                  Bachelor of Science - Pyscology
                </p>
                <p className="text-sm font-medium text-gray-500">
                  University of Ghana,
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold leading-5">Language</p>
          <div className="flex flex-row gap-2.5">
            {doctor.languages?.map((language, index) => (
              <div
                key={index}
                className="rounded-full bg-blue-100 p-3 text-sm text-blue-600"
              >
                {language}
              </div>
            ))}
          </div>
        </div>
        {doctor.awards && doctor.awards.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold leading-5">Awards</p>
            <div className="flex flex-row gap-2.5">
              {doctor.awards?.map((award, index) => (
                <div
                  key={index}
                  className="rounded-full bg-blue-100 p-3 text-sm text-blue-600"
                >
                  {award}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailsInfo;
