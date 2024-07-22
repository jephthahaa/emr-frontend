import React from "react";
import SurgeriesCard from "../surgries/components/surgeriesCard";
import { Plus } from "lucide-react";
import Dialog from "@/components/misc/dialog";
import AddAllergyDialog from "@/components/patients/patientsDetails/views/allergies/components/addAllergyDialog";
import { IPatient } from "@/types";
import { isServiceMode } from "@/constants";

const PatientAllergies = ({ patient }: { patient?: IPatient }) => {
  return (
    <main className="flex h-[calc(100vh-164px)] flex-1 flex-col gap-12 overflow-scroll p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Allergies</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">Current Allergies</p>
          <div className="flex flex-row gap-4">
            {patient?.allergies?.length === 0 && (
              <div className="flex h-[160px] w-[360px] items-center justify-center">
                <p className="text-gray-500">Patient has no allergies</p>
              </div>
            )}
            {patient?.allergies?.map((allergy) => (
              <SurgeriesCard
                key={allergy.id}
                name={allergy.allergy}
                code={allergy.severity}
              />
            ))}
          </div>
        </div>
        {isServiceMode("DOCTOR") && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Add new allergy</p>
            <div className="flex flex-row gap-4">
              <Dialog
                dialogChild={({ onClose }) => (
                  <AddAllergyDialog onClose={onClose} />
                )}
              >
                <button className="flex h-[160px] w-[180px] items-center justify-center rounded-lg border border-dashed border-gray-200">
                  <Plus className="h-6 w-6" />
                </button>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PatientAllergies;
