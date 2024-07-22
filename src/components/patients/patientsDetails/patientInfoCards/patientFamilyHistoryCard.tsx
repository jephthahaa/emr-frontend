import { Edit01Icon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { isServiceMode } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { IFamilyMember } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

const PatientFamilyHistoryCard = ({
  familyMembers,
}: {
  familyMembers: IFamilyMember[];
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-[288px] flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">Family members</p>

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
      <div className="flex flex-col gap-4">
        {familyMembers.length === 0 && (
          <p className="text-gray-500">No family members to show</p>
        )}
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-row items-center justify-between text-sm"
          >
            <p className="text-gray-500">{member.relation}</p>
            <p className="font-medium">
              {member.firstName} {member.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientFamilyHistoryCard;
