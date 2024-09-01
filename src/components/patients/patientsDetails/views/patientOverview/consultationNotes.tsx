"use client";
import React, { useState } from "react";
import ViewTabs from "@/components/misc/viewTabs";
import AllView from "@/components/patients/patientsDetails/views/patientOverview/Views/all";
import LabRequests from "@/components/patients/patientsDetails/views/patientOverview/Views/labRequests";
import PrescriptionsView from "@/components/patients/patientsDetails/views/patientOverview/Views/prescriptionsView";

const CONSULTATION_NOTES_TABS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "notes",
    label: "Notes",
  },
  {
    value: "labs",
    label: "Labs",
  },
  {
    value: "prescriptions",
    label: "Prescriptions",
  },
];

const ConsultationNotes = ({ patientId }: { patientId: string }) => {
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
      </div>
      {
        {
          all: <AllView patientId={patientId} />,
          notes: <AllView patientId={patientId} />,
          labs: <LabRequests patientId={patientId} />,
          prescriptions: <PrescriptionsView patientId={patientId} />,
        }[selectedView]
      }
    </div>
  );
};

export default ConsultationNotes;
