"use client";
import React, { useState } from "react";
import { Button as ShadButton } from "@/components/ui/button";
import ViewTabs from "@/components/misc/viewTabs";
import { PrinterIcon } from "@/assets/icons";
import ConsultationNoteItem from "./components/consultationNoteItem";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useZomujoApi from "@/services/zomujoApi";
import AllView from "@/components/patients/patientsDetails/views/patientOverview/Views/all";
import LabRequests from "@/components/patients/patientsDetails/views/patientOverview/Views/labRequests";

const CONSULTATION_NOTES_TABS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "documents-and-files",
    label: "Documents & Files",
  },
  {
    value: "notes",
    label: "Notes",
  },
  {
    value: "lab-requests",
    label: "Lab Requests",
  },
  {
    value: "lab-tests",
    label: "Lab Tests",
  },
  {
    value: "prescriptions",
    label: "Prescriptions",
  },
];

const ConsultationNotes = () => {
  const [selectedView, setSelectedView] = useState(
    CONSULTATION_NOTES_TABS[0].value,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-8">
        <p className="text-xl font-bold">Consultation Notes</p>
        <div className="flex flex-row items-center justify-between">
          <ViewTabs
            value={selectedView}
            options={CONSULTATION_NOTES_TABS}
            onChange={setSelectedView}
          />
          {/*<ShadButton*/}
          {/*  variant="outline"*/}
          {/*  className="h-9 w-fit gap-1.5 bg-transparent"*/}
          {/*>*/}
          {/*  <PrinterIcon className="h-4 w-4" />*/}
          {/*  Download csv*/}
          {/*</ShadButton>*/}
        </div>
        {/* <div className="flex flex-row items-center gap-4">
          <div className="relative flex flex-1">
            <input
              className="h-11 w-full rounded-xl border border-gray-300 bg-grayscale-10 pl-4 pr-12 outline-none"
              placeholder="Add a note"
            />
          </div>
          <div className="flex flex-row gap-2">
            <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 p-3">
              <Attachment01Icon className="h-4 w-4" />
            </button>
            <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 p-3">
              <FaceSmileIcon className="h-4 w-4" />
            </button>
          </div>
        </div> */}
      </div>
      {
        {
          all: <AllView />,
          notes: <AllView />,
          "lab-requests": <LabRequests />,
        }[selectedView]
      }
    </div>
  );
};

export default ConsultationNotes;
