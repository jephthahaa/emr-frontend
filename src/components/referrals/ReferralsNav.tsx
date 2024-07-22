"use client";
import React from "react";

function ReferralsNav({
  isActive,
  setIsActive,
}: {
  isActive: string;
  setIsActive: (value: string) => void;
}) {
  return (
    <nav className="inline-flex h-[38px] flex-row items-center rounded-full bg-gray-50 p-1">
      <div
        className={`flex h-[38px] flex-1 cursor-pointer items-center justify-center rounded-full px-2.5 py-1.5 ${
          isActive === "refer_doctors" ? "bg-white shadow-sm" : "bg-gray-50"
        }`}
        onClick={() => setIsActive("refer_doctors")}
        style={{
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <p
          className={`text-sm leading-[17px] ${
            isActive === "refer_doctors"
              ? "font-medium text-black"
              : "font-normal text-gray-500"
          }`}
        >
          Refer doctors
        </p>
      </div>
      <div
        className={`flex h-[38px] flex-1 cursor-pointer items-center justify-center rounded-full px-2.5 py-1.5 ${
          isActive === "referred_to_you" ? "bg-white shadow-sm" : "bg-gray-50"
        }`}
        onClick={() => setIsActive("referred_to_you")}
        style={{
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="flex items-center gap-2.5">
          <p
            className={`text-sm leading-[17px] ${
              isActive === "referred_to_you"
                ? "font-medium text-black"
                : "font-normal text-gray-500"
            }`}
          >
            Referred you
          </p>
          <p className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-sm font-medium leading-4">
            1
          </p>
        </div>
      </div>
    </nav>
  );
}

export default ReferralsNav;
