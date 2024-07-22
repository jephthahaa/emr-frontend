import { Edit01Icon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import React from "react";
import PatientInfoCardItem from "./components/patientInfoCardItem";
import { ISurgery } from "@/types";
import { isServiceMode } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { useParams } from "next/navigation";
import { action } from "@/redux";

const PatientSurgicalHistoryCard = ({
  surgeries,
}: {
  surgeries: ISurgery[];
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-[288px] flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">Surgical</p>

        {isServiceMode("DOCTOR") && (
          <Button
            onClick={() =>
              dispatch(
                action.patients.setSelectedViewTab({
                  id,
                  tab: "surgries",
                }),
              )
            }
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 px-1.5 py-0.5"
          >
            <Edit01Icon className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-4">
        {surgeries.length === 0 && (
          <div className="flex min-h-[48px] items-center justify-center">
            <p className="text-sm text-gray-500">No Surgeries</p>
          </div>
        )}
        {surgeries.map((surgery) => (
          <PatientInfoCardItem key={surgery.id} surgery={surgery} />
        ))}
      </div>
    </div>
  );
};

export default PatientSurgicalHistoryCard;
