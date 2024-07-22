import { DrugsIcon } from "@/assets/icons";
import { ChevronUp } from "lucide-react";
import React from "react";

const ConditionsAndMedicationscard = () => {
  return (
    <div className="flex w-[288px] flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">Conditions and Medications</p>
      </div>
      <hr className="my-4" />
      <div className="flex h-[308px] flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-b from-[#C5D8FF] to-[#C5D8FF82] p-4">
          <div className="flex flex-row items-center justify-between">
            <div className="rounded-full bg-white px-2 py-0.5">
              <p className="text-xs font-medium">Asthama</p>
            </div>

            <button className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-row items-center gap-1 text-[#001E5C]">
            <DrugsIcon className="h-4 w-4" />
            <p>Ventolin respirator (5mg/ml)</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-b from-[#C5D8FF] to-[#C5D8FF82] p-4">
          <div className="flex flex-row items-center justify-between">
            <div className="rounded-full bg-white px-2 py-0.5">
              <p className="text-xs font-medium">Asthama</p>
            </div>

            <button className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-row items-center gap-1 text-[#001E5C]">
            <DrugsIcon className="h-4 w-4" />
            <p>Ventolin respirator (5mg/ml)</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-b from-[#C5D8FF] to-[#C5D8FF82] p-4">
          <div className="flex flex-row items-center justify-between">
            <div className="rounded-full bg-white px-2 py-0.5">
              <p className="text-xs font-medium">Asthama</p>
            </div>

            <button className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-row items-center gap-1 text-[#001E5C]">
            <DrugsIcon className="h-4 w-4" />
            <p>Ventolin respirator (5mg/ml)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsAndMedicationscard;
