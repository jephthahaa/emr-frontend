import { Edit01Icon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { IAllergy } from "@/types";
import React from "react";
import { isServiceMode } from "@/constants";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { cn } from "@/utils";

const PatientAllergiesHistoryCard = ({
  allergies,
}: {
  allergies: IAllergy[];
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-[288px] flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">Allergies</p>

        {isServiceMode("DOCTOR") && (
          <Button
            onClick={() =>
              dispatch(
                action.patients.setSelectedViewTab({
                  id,
                  tab: "allergies",
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
        {allergies.length === 0 && (
          <div className="flex min-h-[48px] items-center justify-center">
            <p className="text-sm text-gray-500">No Surgeries</p>
          </div>
        )}
        {allergies.map((allergy) => (
          <div
            key={allergy.id}
            className={cn(
              "flex flex-col gap-4 rounded-xl bg-gradient-to-b p-4",
              {
                mild: "from-gray-300 to-gray-100 text-gray-500",
                moderate: "from-orange-300 to-orange-100 text-amber-700",
                severe: "from-[#FCA5A5] to-[#FFECEC] text-[#840000]",
              }[allergy.severity],
            )}
          >
            <div className="flex flex-row items-center gap-1">
              <p className="font-bold">{allergy.allergy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAllergiesHistoryCard;
