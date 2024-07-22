"use client";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import useZomujoApi from "@/services/zomujoApi";
import { cn, countFilledFields } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const GettingStartedCard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { getUserDetails } = useZomujoApi(false).shared;

  const { data: userDetails } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  const { missingFields, count } = useMemo(() => {
    if (userDetails) {
      const { count, missingFields } = countFilledFields(userDetails)!;
      return { count, missingFields };
    } else {
      return { count: 1, missingFields: [] };
    }
  }, [userDetails]);

  const filledPercent = ((count - missingFields.length) / count) * 100;

  return (
    <div
      className={cn(
        "relative hidden w-full flex-col items-center justify-center gap-6 rounded-lg bg-gradient-to-t from-teal-800 to-emerald-500 px-5 py-4",
        filledPercent === 100 ? "hidden" : "flex",
      )}
    >
      <div className="z-20 flex h-14 w-full flex-col items-start justify-start gap-2">
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-base font-medium text-white">Getting Started</p>
          <p className="text-sm font-bold text-white">
            {Math.floor(filledPercent ?? 30)}%
          </p>
        </div>
        <div className="text-xs font-normal text-white">
          Complete profile to unlock other superb features
        </div>
      </div>
      <div className="z-20 h-1 w-full rounded-full bg-white/10">
        <div
          style={{
            width: `${filledPercent ?? 30}%`,
          }}
          className="h-1 rounded-full bg-white"
        ></div>
      </div>
      <button
        onClick={() => {
          dispatch(action.settings.setSelectedTab("personal"));
          router.push("/settings");
        }}
        className="z-20 flex h-9 flex-col items-center justify-center self-stretch rounded-md border border-white border-opacity-20 bg-white bg-opacity-20 backdrop-blur-lg"
      >
        <p className="text-sm font-medium text-white">Complete Profile</p>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="158"
        height="178"
        viewBox="0 0 158 178"
        fill="none"
        className="absolute bottom-0 left-0 z-0"
      >
        <path
          d="M-64 250L124 -72H158L124 250H-64Z"
          fill="url(#paint0_linear_412_12737)"
          fillOpacity="0.7"
        />
        <defs>
          <linearGradient
            id="paint0_linear_412_12737"
            x1="-17.5"
            y1="26"
            x2="153"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="222"
        height="178"
        viewBox="0 0 222 178"
        fill="none"
        className="absolute bottom-0 right-0 z-10"
      >
        <path
          d="M0 250L188 -72H222L188 250H0Z"
          fill="url(#paint0_linear_412_12736)"
          fillOpacity="0.7"
        />
        <defs>
          <linearGradient
            id="paint0_linear_412_12736"
            x1="46.5"
            y1="26"
            x2="217"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GettingStartedCard;
