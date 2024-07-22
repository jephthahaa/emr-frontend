"use client";
import PatientAllergies from "@/components/patients/patientsDetails/views/allergies";
import PatientDemographics from "@/components/patients/patientsDetails/views/demographics";
import PatientGyaenacology from "@/components/patients/patientsDetails/views/gyae";
import PatientLifestyleAndFamily from "@/components/patients/patientsDetails/views/lifestyleNfamily";
import PatientOverview from "@/components/patients/patientsDetails/views/patientOverview";
import PatientSurgries from "@/components/patients/patientsDetails/views/surgries";
import useZomujoApi from "@/services/zomujoApi";
import { IPatient } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { consultationItems, sidebarItems } from "@/constants";
import React, { useState } from "react";
import FaceSmileIcon from "@/assets/icons/FaceSmileIcon";
import { cn } from "@/utils";
import { Message01Icon } from "@/assets/icons";

const SettingsPatientRecords = () => {
  const [selectedTab, setSelectedTab] = useState(sidebarItems[0].id as string);
  const { getUserDetails } = useZomujoApi(false).shared;

  const { data: userDetails } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  const patient = userDetails as unknown as IPatient;

  return (
    <main className="flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 overflow-y-scroll p-8">
      <div className="flex w-full flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Records</h2>
        </header>
        <hr />
        <div className="flex h-10 w-full flex-row items-center rounded-lg bg-grayscale-100">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTab(item.id);
              }}
              className="flex items-center gap-1.5 px-3 "
            >
              <FaceSmileIcon
                className={cn(
                  "h-5 w-5",
                  item.id === selectedTab && "text-primary",
                )}
              />
              <p>{item.title}</p>
            </button>
          ))}
          {consultationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTab(item.id);
              }}
              className={cn("flex items-center gap-1.5 px-3")}
            >
              <Message01Icon
                className={cn(
                  "h-5 w-5",
                  item.id === selectedTab && "text-primary",
                )}
              />
              <p>{item.title}</p>
            </button>
          ))}
        </div>
        <>
          {patient &&
            {
              overview: <PatientOverview patient={patient} />,
              demographics: <PatientDemographics patient={patient} />,
              "consultation-notes": <></>,
              surgries: <PatientSurgries patient={patient} />,
              allergies: <PatientAllergies patient={patient} />,
              "lifestyle-and-family": (
                <PatientLifestyleAndFamily patient={patient} />
              ),
              gynae: <PatientGyaenacology patient={patient} />,
              diagnosis: <></>,
              "lab-results": <></>,
              prescription: <></>,
            }[selectedTab]}
        </>
      </div>
    </main>
  );
};

export default SettingsPatientRecords;
