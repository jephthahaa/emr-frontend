import React, { useState } from "react";
import GettingStartedCard from "./gettingStartedCard";
import { SERVICE_MODE, isServiceMode } from "@/constants";
import Chip from "@/components/misc/chip";
import { SidebarControlsOptions } from "./sidebarControlsOptions";
import { isUrl } from "@/utils";
import Image from "next/image";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";

const SidebarControls = () => {
  const { getUserDetails } = useZomujoApi(false).shared;

  const { data: userDetails } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  return (
    <div>
      {!isServiceMode("ADMIN") && <GettingStartedCard />}
      <div className="flex h-14 w-full flex-row items-center justify-between py-2">
        <div className="flex flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-600">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(userDetails?.profilePicture)}
              width={40}
              height={28}
              alt="profile"
            />
          </div>
          <div className="flex h-full flex-col justify-between">
            <p className="text-sm font-medium ">
              {isServiceMode("DOCTOR") && "Dr. "}
              {`${userDetails?.firstName ?? "John"} ${
                userDetails?.lastName ?? "Doe"
              }`}
            </p>
            <Chip varient="red" text={SERVICE_MODE.toLowerCase()} />
          </div>
        </div>
        <SidebarControlsOptions />
      </div>
    </div>
  );
};

export default SidebarControls;
