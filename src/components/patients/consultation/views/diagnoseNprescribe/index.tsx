"use client";
import { Stethoscope } from "lucide-react";
import React, { useState } from "react";

import { PerscriptionIcon } from "@/assets/icons";
import { cn } from "@/utils";
// import SavedDiagnosisView from "./Views/savedDiagnosisView";
import MedicineView from "./Views/medicineView";
import DiagnosisView from "./Views/diagnosisView";

const TABS = [
  // {
  //   id: "saved_diagnosis",
  //   name: "Saved Diagnosis",
  //   Icon: Bookmark,
  //   View: SavedDiagnosisView,
  // },
  {
    id: "diagnosis",
    name: "Diagnosis",
    Icon: Stethoscope,
    View: DiagnosisView,
  },
  {
    id: "medicine",
    name: "Medicine",
    Icon: PerscriptionIcon,
    View: MedicineView,
  },
];

const ConsultationDiagnoseNPrescribeView = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const CurrentView = TABS[selectedTab].View;
  return (
    <div className="flex h-[calc(100vh-32px-166px)] flex-1 flex-col gap-12 overflow-scroll p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-3 border-b border-gray-200">
          {TABS.map(({ Icon, name, id }, index) => (
            <div
              onClick={() => setSelectedTab(index)}
              key={id}
              className="relative flex cursor-pointer flex-col"
            >
              <div
                className={cn(
                  "flex flex-row items-center gap-1 px-0.5 py-2 ",
                  index === selectedTab ? "text-primary" : "text-gray-400",
                )}
              >
                <Icon className="h-5 w-5" />
                <p>{name}</p>
              </div>
              {index === selectedTab && (
                <div className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-primary"></div>
              )}
            </div>
          ))}
        </div>
        <CurrentView />
      </div>
    </div>
  );
};

export default ConsultationDiagnoseNPrescribeView;
