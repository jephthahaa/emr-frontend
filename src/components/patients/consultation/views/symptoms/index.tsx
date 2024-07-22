"use client";
import { Input } from "@/components/FormElements";
import DatePicker from "@/components/misc/datePicker";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import PatientSymptomSelector from "./components/patientSymptomSelector";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ZodError, z } from "zod";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import PatientMedicineSelector from "./components/patientMedicineSelector";

const ConsultationSymptomsView = () => {
  const { DEFAULTS, consultationState } = useAppSelector(
    (state) => state.consultation,
  );
  const dispatch = useAppDispatch();

  const categories = [
    "Neurological",
    "Cardiovascular",
    "Respiratory",
    "Musculoskeletal",
    "Gastrointestinal",
    "Genitourinary",
    "Integumentary",
    "Endocrine",
  ];

  return (
    <div className="flex h-[calc(100vh-32px-166px)] flex-1 flex-col gap-8 overflow-y-scroll p-6 scrollbar-thin">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl font-bold">Complaint</h3>
        <Search />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row flex-wrap gap-4">
          {DEFAULTS.COMPLAINTS.map((symptom, i) => (
            <button
              key={symptom}
              onClick={() => {
                if (consultationState.complaints.includes(symptom)) {
                  dispatch(action.consultation.removeComplaint(symptom));
                } else {
                  dispatch(action.consultation.addComplaint(symptom));
                }
              }}
              className={cn(
                "flex flex-row items-center gap-1.5 rounded-full bg-gray-100 px-4 py-1.5 text-black duration-100 hover:bg-gray-200",
                consultationState.complaints.includes(symptom) &&
                  "bg-primary text-white",
              )}
            >
              <p className="text-sm">{symptom}</p>
            </button>
          ))}
        </div>
        <AddSymptom
          onAdd={(value) => {
            dispatch(action.consultation.addComplaintAndDefault(value));
          }}
        />
      </div>
      <hr />
      <div className="flex flex-col">
        <div className="mb-12 flex flex-col gap-6">
          <h3 className="text-xl font-bold">Duration</h3>
          <DatePicker
            date={consultationState.complaintsDuration}
            setDate={(date) =>
              dispatch(action.consultation.setComplaintDuration(date))
            }
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex w-fit flex-row items-center gap-1">
            <h3 className="text-xl font-bold">Symptoms</h3>
            <HiInformationCircle className="h-5 w-5 text-gray-400" />
          </div>
          {categories.map((cat) => {
            return <PatientSymptomSelector key={cat} title={`${cat} System`} />;
          })}
          <PatientMedicineSelector />
        </div>
      </div>
    </div>
  );
};

export default ConsultationSymptomsView;

const MotionButton = motion(Button);

export const AddSymptom = ({ onAdd }: { onAdd: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleAdd = async () => {
    try {
      const newText = z
        .string({ required_error: "cannot add empty text" })
        .min(3)
        .parse(text);

      onAdd(newText);

      setText("");
    } catch (error) {
      toast.error((error as ZodError).errors[0].message);
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <Input
        icon={<Search size={18} />}
        className="max-w-[270px] rounded-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Specify a symptom"
      />
      <MotionButton
        initial={{ opacity: 0, x: -8 }}
        animate={{
          opacity: text.length > 3 ? 1 : 0,
          x: text.length > 3 ? 0 : -8,
        }}
        transition={{ duration: 0.1 }}
        variant="outline"
        onClick={handleAdd}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 p-0 text-black",
        )}
      >
        <Plus size={18} />
      </MotionButton>
    </div>
  );
};
