"use client";
import { Edit01Icon } from "@/assets/icons";
import Chip from "@/components/misc/chip";
import Dialog from "@/components/misc/dialog";
import HalfCircleProgress from "@/components/misc/halfCircleProgress";
import { Button } from "@/components/ui/button";
import { IPatient } from "@/types";
import { interpolateRange } from "@/utils";
import { interpolate } from "framer-motion";
import React from "react";
import PatientVitalsEditDialog from "./infoEditDialogs/patientVitalsEditDialog";
import { isServiceMode } from "@/constants";

const PatientVitalsCard = ({ patient }: { patient?: IPatient }) => {
  const vitalsColor = interpolate(
    [0, 0.25, 0.75, 1],
    ["#F59E0B", "#16A34A", "#16A34A", "#DC2626"],
    {
      clamp: true,
    },
  );
  return (
    <div className="flex w-[288px] flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">Vitals</p>

        <Dialog
          disableOutsideClick
          dialogChild={({ onClose }) => (
            <PatientVitalsEditDialog onClose={onClose} patient={patient!} />
          )}
        >
          {isServiceMode("DOCTOR") && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 px-1.5 py-0.5"
            >
              <Edit01Icon className="h-4 w-4" />
              Edit
            </Button>
          )}
        </Dialog>
      </div>
      <hr className="my-4" />
      <div className="flex h-28 items-center justify-center">
        <HalfCircleProgress
          progress={VitalsRange(patient?.bloodPressure!)}
          size={224}
          stroke={32}
          color={vitalsColor(VitalsRange(patient?.bloodPressure!))}
          bottomComponent={
            <div className="absolute bottom-0 flex w-full flex-col items-center gap-1">
              <p className="text-xs text-gray-500">Blood Pressure</p>
              <p className="font-bold">
                {patient?.bloodPressure
                  ? `${patient.bloodPressure.systolic}/${patient.bloodPressure.diastolic}`
                  : "120/80"}
                mmHg
              </p>
            </div>
          }
        />
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Weight</p>
          {patient?.weight ? (
            <p className="font-medium">{patient?.weight ?? "70"} kg</p>
          ) : (
            "<Empty>"
          )}
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Heart Rate</p>
          {patient?.heartRate ? (
            <Chip text={`${Number(patient?.heartRate)} bpm`} varient="green" />
          ) : (
            "<Empty>"
          )}
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Blood Sugar Level</p>
          {patient?.bloodSugarLevel ? (
            <Chip
              text={`${Number(patient?.bloodSugarLevel)} mg/dL`}
              varient="yellow"
            />
          ) : (
            "<Empty>"
          )}
        </div>
        <div className="flex flex-row items-center justify-between text-sm">
          <p className="text-gray-500">Temperature</p>
          <p className="font-medium">
            {patient?.temperature ? `${patient?.temperature} ˚C` : "<Empty>"}
          </p>
        </div>
      </div>
    </div>
  );
};

const VitalsRange = (data: IPatient["bloodPressure"]) => {
  const { systolic, diastolic } = data ?? {
    systolic: 120,
    diastolic: 80,
  };
  const percSystolic = interpolateRange(systolic, 80, 200, 0, 1);
  const percDiastolic = interpolateRange(diastolic, 60, 140, 0, 1);

  const range = (percSystolic + percDiastolic) / 2;

  return range;
};

export default PatientVitalsCard;
