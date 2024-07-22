"use client";
import { useAppSelector } from "@/hooks";
import React from "react";
import PatientOverview from "./views/patientOverview";
import PatientDemographics from "./views/demographics";
import PatientSurgries from "./views/surgries";
import PatientAllergies from "./views/allergies";
import PatientLifestyleAndFamily from "./views/lifestyleNfamily";
import PatientGyaenacology from "./views/gyae";
import { useParams } from "next/navigation";
import { useGetPatientRecords } from "@/hooks/queryHooks";

const PatientsDetailsViews = () => {
  const { id } = useParams<{ id: string }>();
  const selectedTab = useAppSelector(
    (state) => state.patients.viewTabs[id]?.selectedTab,
  );

  const patient = useGetPatientRecords(id);

  return (
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
  );
};

export default PatientsDetailsViews;
