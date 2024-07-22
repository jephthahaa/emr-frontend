import React from "react";
import Image from "next/image";
import patientImg from "@/assets/images/patient.png";
import Button from "@/components/misc/button";

export default function ReferringSpecialists() {
  return (
    <div className="flex flex-row items-center gap-4 self-stretch">
      <p className="text-xl font-bold leading-7 text-gray-500">
        Referring specialist to:
      </p>
      <div className="flex flex-row items-center gap-[11px]">
        <Image
          alt="Patient"
          src={patientImg}
          className="h-7 w-7 rounded-full"
        />
        <p className="text-base font-bold text-black">William Tsikata</p>
      </div>
      <Button
        className="h-9 w-max text-sm"
        primaryClassname=" gap-1 px-2.5 py-2"
      >
        Change
      </Button>
    </div>
  );
}
