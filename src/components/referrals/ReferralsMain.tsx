"use client";
import { cn } from "@/utils";
import React, { useState } from "react";

const Tabs = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "Declined",
    value: "declined",
  },
];

function ReferralsMain({ isActive }: { isActive: string }) {
  const [selectedTab, setSelectedTab] = useState(Tabs[0].value);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-xl font-bold leading-[26px] text-black">
              Total referred doctors
            </h3>
            <h3 className="text-4xl font-bold leading-[54px] text-black">0</h3>
          </div>
          <h3 className="text-base font-normal leading-[20.8px] tracking-[-0.16px] text-gray-500">
            Direct your patients to doctors to ensure they receive appropriate
            medical care
          </h3>
        </div>
        <div className="flex w-full flex-col gap-7">
          <div className="flex flex-row gap-2 border-b">
            {Tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                className={cn(
                  "px-2 pb-2 font-medium text-gray-500",
                  selectedTab === tab.value &&
                    "border-b-2 border-black font-bold text-black",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex h-[142px] w-full items-center justify-center">
            <p className="text-gray-500">No practitioner referred</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferralsMain;
