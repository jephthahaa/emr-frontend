"use client";
import React, { useState } from "react";
import { cn } from "@/utils";
import { isServiceMode } from "@/constants";
import AppointmentTabs from "@/components/appointments/appointmentTabs";
import Button from "@/components/misc/button";

const SettingsGlobalsView = () => {
  const [selectedTab, setSelectedTab] = useState("Symptoms");

  return (
    <main
      className={cn(
        "flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 overflow-y-scroll p-8",
        isServiceMode("ADMIN") && "h-full",
      )}
    >
      <div className="flex w-[770px] flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Globals</h2>
          <p className="leading-4 text-gray-500">
            Update settings across system
          </p>
        </header>
        <hr />

        <div className="flex flex-col gap-7">
          <div className="flex flex-row items-center justify-between">
            <AppointmentTabs
              tabs={[
                {
                  name: "Symptoms",
                  count: 0,
                },
                {
                  name: "Medications",
                  count: 0,
                },
              ]}
              counts={[0]}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              float={false}
            />

            <div>
              <Button primaryClassname={"px-4"}>
                Add New {selectedTab === "Symptoms" ? "Symptom" : "Medication"}
              </Button>
            </div>
          </div>

          {selectedTab === "Symptoms" ? (
            <div>
              <div></div>
            </div>
          ) : (
            <div>
              <div></div>
            </div>
          )}
        </div>
        <hr />
      </div>
    </main>
  );
};
export default SettingsGlobalsView;
