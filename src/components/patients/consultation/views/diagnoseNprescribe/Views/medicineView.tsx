/* eslint-disable react/no-unescaped-entities */
import Sheet from "@/components/misc/sheet";
import Card from "@/components/patients/components/card";
import { Plus } from "lucide-react";
import React from "react";
import PrescribeMedicineSheet from "../prescribeMedicineSheet";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useZomujoApi from "@/services/zomujoApi";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import TempCard from "@/components/patients/components/tempCard";
import { action } from "@/redux";

const MedicineView = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { getPatientPrescriptions } = useZomujoApi(false).doctors.records;
  const currentPrescriptions = useAppSelector(
    (state) => state.consultation.consultationState.prescriptions,
  );

  const { data: PrescriptionDataBase, isLoading } = useQuery({
    queryKey: ["consultation", "prescriptions", id],
    queryFn: () => getPatientPrescriptions(id),
    refetchOnMount: false,
  });

  const prescriptionsData = PrescriptionDataBase?.data ?? [];

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold">Medications</p>
        <div className="flex min-h-[160px] flex-row gap-4">
          {isLoading && (
            <div className="flex h-[160px] w-full items-center justify-center">
              <LoadingSpinner size={32} stroke={3} />
            </div>
          )}
          {PrescriptionDataBase &&
            prescriptionsData.map((prescription) => (
              <Card key={prescription.id} label={prescription.medicine} />
            ))}
          {PrescriptionDataBase && prescriptionsData.length === 0 && (
            <div className="flex h-[160px] w-full items-center justify-center">
              <p className="text-gray-500">No Prescriptions</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold">Suggested Medications</p>
        <div className="flex flex-row gap-4">
          <Sheet sheetChild={PrescribeMedicineSheet}>
            <button className="flex h-[160px] w-[180px] items-center justify-center rounded-lg border border-dashed border-gray-200">
              <Plus className="h-6 w-6" />
            </button>
          </Sheet>
          {currentPrescriptions.map((prescription) => (
            <TempCard
              key={prescription.medicine}
              label={prescription.medicine}
              onDelete={() =>
                dispatch(action.consultation.removePrescription(prescription))
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MedicineView;
