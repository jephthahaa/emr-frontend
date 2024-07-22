"use client";
import { Input } from "@/components/FormElements";
import TextArea from "@/components/FormElements/TextArea";
import { Draggables } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useDebounce } from "@/hooks/useDebouce";
import { action } from "@/redux";
import { cn } from "@/utils";
import { GripVertical, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { IMedicine } from "@/types";
import LoadingSpinner from "@/components/misc/loadingSpinner";

const MedicineSelector = ({
  patient = false,
  medicine,
  setMedicine,
  searchText = "",
  setSearchText = () => {},
  isLoading = false,
}: {
  patient?: boolean;
  medicine: string[];
  setMedicine: React.Dispatch<React.SetStateAction<string[]>>;
  searchText?: string;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const selectedMedicine = useAppSelector(
    (state) => state.consultation.consultationState.medicineTaken.medicine,
  );
  const [noteText, setNoteText] = useState("");
  const deboucedNoteText = useDebounce(noteText, 500);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: Draggables.MEDICINE,
      drop: (item: IMedicine) => {
        if (patient) {
          if (selectedMedicine.find((element) => element === item.name)) return;
          dispatch(action.consultation.addMedicine(item.name));
          setMedicine((prev) =>
            prev.filter((medicine) => medicine !== item.name),
          );
        } else {
          dispatch(action.consultation.removeMedicine(item.name));
          if (medicine.find((element) => element === item.name)) return;
          setMedicine((prev) => [...prev, item.name]);
        }
      },
      collect(monitor) {
        return {
          isOver: !!monitor.isOver(),
        };
      },
    }),
    [selectedMedicine, medicine],
  );

  useEffect(() => {
    dispatch(action.consultation.setMedicineNote(deboucedNoteText));
  }, [deboucedNoteText, dispatch]);

  return (
    <div
      ref={drop}
      className={cn(
        "flex h-[300px] w-[370px] flex-col gap-4 rounded-lg border border-gray-200 p-4",
        isOver && patient && "outline outline-primary",
      )}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <p className="text-sm font-bold leading-4">
            {patient ? "Patient Medicine Taken" : "Medicine"}
          </p>
          <div
            className={cn(
              "flex flex-col gap-2.5",
              patient && "h-full justify-between",
            )}
          >
            {!patient && (
              <Input
                icon={<Search size={18} />}
                className="border-gray-300"
                placeholder="Find Medicine"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            )}
            {patient ? (
              <div className="flex h-[130px] flex-col gap-1 overflow-scroll">
                {selectedMedicine.map((medicine) => (
                  <MedicineItem key={medicine} item={medicine} />
                ))}
              </div>
            ) : (
              <div className="flex h-[180px] flex-col gap-1 overflow-scroll">
                {medicine.map((medicine) => (
                  <MedicineItem key={medicine} item={medicine} />
                ))}
              </div>
            )}
            {patient && (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-4">
                  Additional Notes
                </p>
                <TextArea
                  value={noteText}
                  onChange={(e) => {
                    setNoteText(e.target.value);
                  }}
                  className="min-h-[3lh]"
                  placeholder="Type here..."
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const MedicineItem = ({ item }: { item: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Draggables.MEDICINE,
    item: { name: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        "flex w-full flex-row items-center gap-2 rounded-md border border-gray-200 px-2 py-2.5 duration-100",
        isDragging && "border-primaryLightBase",
      )}
    >
      <GripVertical
        size={20}
        className={cn(
          "text-gray-400 duration-100",
          isDragging && "text-primaryLightBase",
        )}
      />
      <p className="text-sm leading-[14px]">{item}</p>
    </div>
  );
};

export default MedicineSelector;
