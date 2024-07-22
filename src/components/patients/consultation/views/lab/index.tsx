/* eslint-disable react/no-unescaped-entities */
import Dialog from "@/components/misc/dialog";
import Card from "@/components/patients/components/card";
import { Plus } from "lucide-react";
import React from "react";
import RequestLabDialog from "./requestLabDialog";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import TempCard from "@/components/patients/components/tempCard";
import Sheet from "@/components/misc/sheet";
import RequestLabSheet from "./requestLabSheet";

const ConsultationLabView = () => {
  const { id } = useParams<{ id: string }>();
  const { getPatientLabs } = useZomujoApi(false).doctors.records;

  const { data: labsDataBase, isLoading } = useQuery({
    queryKey: ["consultation", "labs", id],
    queryFn: () => getPatientLabs(id),
  });

  const labsData = labsDataBase?.data ?? [];

  return (
    <div className="flex h-[calc(100vh-32px-166px)] flex-1 flex-col gap-12 overflow-scroll p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Request Lab</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">Conducted labs</p>
          <div className="flex min-h-[160px] flex-row gap-4">
            {isLoading && (
              <div className="flex h-[160px] w-full items-center justify-center">
                <LoadingSpinner size={32} stroke={3} />
              </div>
            )}
            {labsDataBase &&
              labsData
                .filter((item) => item.status === "completed")
                .map((lab) => <Card key={lab.id} label={lab.lab} />)}
            {labsDataBase &&
              labsData.filter((item) => item.status === "completed").length ===
                0 && (
                <div className="flex h-[160px] w-full items-center justify-center">
                  <p className="text-gray-500">No labs</p>
                </div>
              )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">Request Lab</p>
          {labsData.filter((item) => item.status === "pending").length ===
            0 && (
            <div className="w-fit rounded bg-warning-50 p-2 text-warning-600">
              <p className="text-xs">
                No specific lab test has been recorded for this appointment.
                Click on the "+" icon to request a lab test for this encounter.
              </p>
            </div>
          )}
          <div className="flex flex-row gap-4">
            <Sheet
              sheetChild={({ onClose }) => (
                <RequestLabSheet onClose={onClose} />
              )}
            >
              <button className="flex h-[140px] w-[140px] items-center justify-center rounded-xl border border-dashed border-gray-200">
                <Plus className="h-6 w-6" />
              </button>
            </Sheet>
            {labsDataBase &&
              labsData
                .filter((item) => item.status === "pending")
                .map((lab) => <TempCard key={lab.id} label={lab.lab} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationLabView;
