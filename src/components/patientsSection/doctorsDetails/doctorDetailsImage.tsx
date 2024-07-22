"use client";
import React from "react";
import StarRating from "../miscellaneous/starRating";
import { IDoctor } from "@/types";

const DoctorDetailsImage = ({ doctor }: { doctor: IDoctor }) => {
  return (
    <div className="flex w-[258px] flex-col gap-7">
      <div className="relative h-[258px] w-[258px] rounded-[32px] bg-gray-400">
        <StarRating
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white "
          rating={doctor.ratings}
        />
      </div>
      <div className="flex flex-row items-center justify-between rounded-2xl bg-grayscale-100 p-5">
        <p className="font-medium leading-5">Consultation</p>
        <p className="text-xl font-bold leading-5 text-primaryDark">
          GHs {doctor.rate?.amount}
          <span className="ml-0.5 text-sm font-medium leading-[14px] text-gray-400">
            Fee
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorDetailsImage;
