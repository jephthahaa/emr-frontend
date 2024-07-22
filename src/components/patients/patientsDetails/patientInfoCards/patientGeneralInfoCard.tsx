import React from "react";
import { Edit01Icon } from "@/assets/icons";
import { Button as ShadButton } from "@/components/ui/button";
import Chip from "@/components/misc/chip";
import { IPatient } from "@/types";
import { format } from "date-fns";
import Dialog from "@/components/misc/dialog";
import PatientGeneralInfoEditDialog from "./infoEditDialogs/patientGeneralInfoEditDialog";
import { isServiceMode } from "@/constants";
import Image from "next/image";
import { isUrl } from "@/utils";

const PatientGeneralInfoCard = ({ patient }: { patient?: IPatient }) => {
  return (
    <div className="flex w-[288px] flex-col rounded-xl border border-gray-200 bg-white p-4">
      <></>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-gray-500">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(patient?.profilePicture)}
              width={28}
              height={28}
              alt="profile"
            />
          </div>
          <p className="font-bold">{`${patient?.firstName ?? "William"} ${
            patient?.lastName ?? "Tsikata"
          }`}</p>
        </div>
        <Dialog
          disableOutsideClick
          dialogChild={({ onClose }) => (
            <PatientGeneralInfoEditDialog
              onClose={onClose}
              patient={patient!}
            />
          )}
        >
          {isServiceMode("DOCTOR") && (
            <ShadButton
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 px-1.5 py-0.5"
            >
              <Edit01Icon className="h-4 w-4" />
              Edit
            </ShadButton>
          )}
        </Dialog>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Marital Status</p>
          <p className="font-medium capitalize">
            {patient?.maritalStatus ?? "<Empty>"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Gender</p>
          <Chip text={patient?.gender ?? "male"} varient="yellow" />
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Date of Birth</p>
          <p className="font-medium">
            {format(new Date(patient?.dob ?? "09-09-1999"), "dd-MM-yyyy")}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Denomination</p>
          <p className="font-medium capitalize">
            {patient?.denomination ?? "<Empty>"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Height</p>
          <p className="font-medium">{patient?.height ?? "<Empty>"}</p>
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Blood Group</p>
          <p className="font-medium uppercase">
            {patient?.bloodGroup ?? "<Empty>"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientGeneralInfoCard;
