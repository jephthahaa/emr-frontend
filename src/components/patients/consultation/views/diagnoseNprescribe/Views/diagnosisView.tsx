"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Card from "@/components/patients/components/card";
import { Plus } from "lucide-react";
import AddICDCondition from "../addICDCondition";
import Dialog from "@/components/misc/dialog";
import useZomujoApi from "@/services/zomujoApi";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useAppDispatch, useAppSelector } from "@/hooks";
import TempCard from "@/components/patients/components/tempCard";
import { action } from "@/redux";

const DiagnosisView = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { getPatientDiagnosis } = useZomujoApi(false).doctors.records;
  const currentDiagnosis = useAppSelector(
    (state) => state.consultation.consultationState.diagnosis,
  );

  const { data: DiagnosisDataBase, isLoading } = useQuery({
    queryKey: ["consultation", "diagnosis", id],
    queryFn: () => getPatientDiagnosis(id),
    refetchOnMount: false,
  });

  const diagnosisData = DiagnosisDataBase?.data ?? [];

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold">Existing Conditions</p>
        <div className="flex min-h-[160px] flex-row gap-4">
          {isLoading && (
            <div className="flex h-[160px] w-full items-center justify-center">
              <LoadingSpinner size={32} stroke={3} />
            </div>
          )}
          {DiagnosisDataBase &&
            diagnosisData.map((diagnosis) => (
              <Card
                key={diagnosis.id}
                label={diagnosis.name}
                tag={diagnosis.code}
              />
            ))}
          {DiagnosisDataBase && diagnosisData.length === 0 && (
            <div className="flex h-[160px] w-full items-center justify-center">
              <p className="text-gray-500">No Diagnosis</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold">New ICD Condition</p>
        {currentDiagnosis.length === 0 && (
          <div className="w-fit rounded bg-warning-50 p-2 text-warning-600">
            <p className="text-xs">
              No specific diagnosis has been recorded for this appointment.
              Click on the "+" icon to include a diagnosis for this encounter.
            </p>
          </div>
        )}
        <div className="flex flex-row gap-4">
          <Dialog dialogChild={AddICDCondition}>
            <button className="flex h-[160px] w-[180px] items-center justify-center rounded-lg border border-dashed border-gray-200">
              <Plus className="h-6 w-6" />
            </button>
          </Dialog>
          {currentDiagnosis.map((diagnosis) => (
            <TempCard
              key={diagnosis.name}
              label={diagnosis.name}
              tag={diagnosis.code}
              onDelete={() =>
                dispatch(action.consultation.removeDiagnosis(diagnosis.code))
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DiagnosisView;
