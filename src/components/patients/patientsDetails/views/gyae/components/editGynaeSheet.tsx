import { Input } from "@/components/FormElements";
import { cn } from "@/utils";
import React, { useState } from "react";

// const Contraceptions = ["Oral contraceptive pill", "IUD", "Sterilization"];
const Contraceptions = [
  {
    id: "oral-contraceptive-pill",
    label: "Oral contraceptive pill",
  },
  {
    id: "iud",
    label: "IUD",
  },
  {
    id: "sterilization",
    label: "Sterilization",
  },
];

const PregancyComplications = [
  {
    id: "miscarriage",
    label: "Miscarriage",
  },
  {
    id: "top",
    label: "TOP",
  },
];

const EditGynaeSheet = () => {
  const [selectedContraceptions, setSelectedContraceptions] = useState(
    Contraceptions[0].id,
  );
  const [selectedPregnancyComplication, setSelectedPregnancyComplication] =
    useState(PregancyComplications[0].id);

  return (
    <div className="flex flex-col gap-6 p-7">
      <p className="text-2xl font-bold leading-5">Edit Gynae</p>
      <div className="flex flex-col gap-1.5">
        <p className="font-medium">Contraception</p>
        <div className="flex flex-row gap-4">
          {Contraceptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedContraceptions(option.id)}
              className={cn(
                "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                option.id === selectedContraceptions
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200 ",
              )}
            >
              <p className="text-sm">{option.label}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <p className="font-medium leading-4">Additional Notes</p>
        <textarea
          className="h-28 rounded-md border border-gray-200 p-3 outline-gray-100"
          placeholder="Type something"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="font-medium">Number of Pregnancies</p>
        <Input
          className="w-full border-gray-200 bg-white"
          type="number"
          placeholder="No. of pregnancies"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-medium">Number of Children</p>
        <Input
          className="w-full border-gray-200 bg-white"
          type="number"
          placeholder="No. of children"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="font-medium">Pregnancy Complications</p>
        <div className="flex flex-row gap-4">
          {PregancyComplications.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPregnancyComplication(option.id)}
              className={cn(
                "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                option.id === selectedPregnancyComplication
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200 ",
              )}
            >
              <p className="text-sm">{option.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditGynaeSheet;
