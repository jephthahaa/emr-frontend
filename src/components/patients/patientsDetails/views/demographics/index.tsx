"use client";
import React from "react";
import PatientGeneralInfoCard from "../../patientInfoCards/patientGeneralInfoCard";
import PatientSurgicalHistoryCard from "../../patientInfoCards/patientSurgicalHistoryCard";
import PatientVitalsCard from "../../patientInfoCards/patientVitalsCard";
import ConditionsAndMedicationscard from "../../patientInfoCards/conditionsAndMedicationscard";
import PatientAllergiesHistoryCard from "../../patientInfoCards/patientAllergiesHistoryCard";
import PatientFamilyHistoryCard from "../../patientInfoCards/patientFamilyHistoryCard";
import PatientLifestyleHistoryCard from "../../patientInfoCards/patientLifestyleHistoryCard";
import { IPatient } from "@/types";

const PatientDemographics = ({ patient }: { patient?: IPatient }) => {
  return (
    <main className="flex h-[calc(100vh-164px)] flex-1 flex-col gap-12 overflow-scroll p-6">
      <div className="flex flex-col gap-6">
        <div className="flex h-10 flex-row items-center justify-between">
          <p className="text-xl font-bold">Patient Overview</p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            <PatientGeneralInfoCard patient={patient} />
            <PatientSurgicalHistoryCard surgeries={patient?.surgeries ?? []} />
            <PatientAllergiesHistoryCard allergies={patient?.allergies ?? []} />
          </div>
          <div className="flex flex-col gap-4">
            <PatientVitalsCard patient={patient} />
            <PatientFamilyHistoryCard
              familyMembers={patient?.familyMembers ?? []}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ConditionsAndMedicationscard />
            <PatientLifestyleHistoryCard lifestyle={patient?.lifestyle!} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PatientDemographics;
