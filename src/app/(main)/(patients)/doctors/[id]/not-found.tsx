"use client";
import Button from "@/components/misc/button";
import { useRouter } from "next/navigation";
import React from "react";

const DoctorNotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex h-fit w-fit flex-col items-center justify-center gap-1.5">
        <p className="text-2xl font-bold text-gray-400">Doctor not found</p>
        <p className="text-sm font-medium text-gray-400">
          Oops Doctor does not exist
        </p>
      </div>
      <div>
        <Button
          onClick={() => router.push("/discover")}
          variant="primary"
          primaryClassname="px-8 py-3"
        >
          Discover Doctors
        </Button>
      </div>
    </div>
  );
};

export default DoctorNotFound;
