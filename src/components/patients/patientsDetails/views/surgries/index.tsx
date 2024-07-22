import React from "react";
import SurgeriesCard from "./components/surgeriesCard";
import SurgeriesAddSheet from "@/components/patients/patientsDetails/views/surgries/components/surgeriesAddDialog";
import { Plus } from "lucide-react";
import Sheet from "@/components/misc/sheet";
import { IPatient } from "@/types";
import { isServiceMode } from "@/constants";

const PatientSurgries = ({ patient }: { patient?: IPatient }) => {
  return (
    <main className="flex h-[calc(100vh-164px)] flex-1 flex-col gap-12 overflow-scroll p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Surgries</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">All surgeries & Hospitalization</p>
          <div className="flex flex-row gap-4">
            {patient?.surgeries?.length === 0 && (
              <div className="flex h-[160px] w-[360px] items-center justify-center">
                <p className="text-gray-500">Patient has no sugeries</p>
              </div>
            )}
            {patient?.surgeries?.map((surgery) => (
              <SurgeriesCard key={surgery.id} name={surgery.name} />
            ))}
          </div>
        </div>
        {isServiceMode("DOCTOR") && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Add new surgery</p>
            <div className="flex flex-row gap-4">
              <Sheet
                sheetChild={({ onClose }) => (
                  <SurgeriesAddSheet onClose={onClose} />
                )}
              >
                <button className="flex h-[160px] w-[180px] items-center justify-center rounded-lg border border-dashed border-gray-200">
                  <Plus className="h-6 w-6" />
                </button>
              </Sheet>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PatientSurgries;
