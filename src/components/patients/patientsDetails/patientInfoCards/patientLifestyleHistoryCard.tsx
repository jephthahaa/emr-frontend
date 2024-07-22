import { Edit01Icon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { isServiceMode } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { ILifestyle } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

const PatientLifestyleHistoryCard = ({
  lifestyle,
}: {
  lifestyle: ILifestyle | null;
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-[288px] flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">Lifestyle & Family</p>

        {isServiceMode("DOCTOR") && (
          <Button
            onClick={() =>
              dispatch(
                action.patients.setSelectedViewTab({
                  id,
                  tab: "lifestyle-and-family",
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
      <div className="flex min-h-[172px] flex-col gap-4">
        <p className="text-base font-bold">Lifestyle</p>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Occupation</p>
          <p className="font-medium">{lifestyle?.occupation ?? "<Empty>"}</p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Alcohol</p>
          <p className="font-medium">
            {lifestyle?.alcohol?.status ?? "<Empty>"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Stress</p>
          <p className="font-medium">{lifestyle?.stress ?? "<Empty>"}</p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Smoking</p>
          <p className="font-medium">
            {lifestyle?.smoking.status ?? "<Empty>"}
          </p>
        </div>
        {lifestyle?.familyHistory && (
          <>
            <p className="text-base font-bold">Family History</p>
            <p>{lifestyle.familyHistory}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientLifestyleHistoryCard;
