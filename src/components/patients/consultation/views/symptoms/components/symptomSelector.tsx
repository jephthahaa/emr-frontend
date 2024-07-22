"use client";
import { Input } from "@/components/FormElements";
import TextArea from "@/components/FormElements/TextArea";
import { Draggables } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useDebounce } from "@/hooks/useDebouce";
import { action } from "@/redux";
import { cn } from "@/utils";
import { GripVertical, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import LoadingSpinner from "@/components/misc/loadingSpinner";

const SymptomSelector = ({
  title = "",
  patientTitle = "Patient Symptoms",
  patient = false,
  symptoms = [],
  setSymptoms = () => {},
  searchText = "",
  setSearchText = () => {},
  isLoading = false,
}: {
  title?: string;
  patientTitle?: string;
  patient?: boolean;
  symptoms?: { name: string; id: string; type: string }[];
  setSymptoms?: React.Dispatch<
    React.SetStateAction<{ name: string; id: string; type: string }[]>
  >;
  searchText?: string;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [initialRender, setInitialRender] = useState(true);
  const selectedSymptoms = useAppSelector(
    (state) => state.consultation.symptoms,
  ).filter((symptom) => symptom.type === title.split(" ")[0]);

  const Symptoms = useAppSelector(
    (state) => state.consultation.consultationState.sypmtoms,
  );
  const [noteText, setNoteText] = useState(
    Symptoms[title.split(" ")[0]]?.notes ?? "",
  );
  const deboucedNoteText = useDebounce(noteText, 500);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: `${Draggables.SYMPTOM}-${title.split(" ")[0]}`,
      drop: (item: { name: string; id: string; type: string }) => {
        if (patient) {
          if (selectedSymptoms.find((element) => element.id === item.id))
            return;
          setSymptoms((prev) =>
            prev.filter((symptom) => symptom.name !== item.name),
          );
          dispatch(action.consultation.addSymptom(item));
        } else {
          dispatch(action.consultation.removeSymptom(item));
          if (symptoms.find((element) => element.id === item.id)) return;
          setSymptoms((prev) => [...prev, item]);
        }
      },
      collect(monitor) {
        return {
          isOver: !!monitor.isOver(),
        };
      },
    }),
    [selectedSymptoms, symptoms],
  );

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      dispatch(
        action.consultation.setSymptomNotes({
          id: title.split(" ")[0],
          notes: deboucedNoteText,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deboucedNoteText, dispatch, title]);

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
            {patient ? patientTitle : title}
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
                placeholder="Find symptoms"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            )}
            {patient ? (
              <div className="flex h-[130px] flex-col gap-1 overflow-scroll">
                {selectedSymptoms.map((symptom) => (
                  <SymptomItem key={symptom.id} item={symptom} />
                ))}
              </div>
            ) : (
              <div className="flex h-[180px] flex-col gap-1 overflow-scroll">
                {symptoms.map((symptom) => (
                  <SymptomItem key={symptom.id} item={symptom} />
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

const SymptomItem = ({
  item,
}: {
  item: { name: string; id: string; type: string };
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: `${Draggables.SYMPTOM}-${item.type}`,
    item: item,
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
      <p className="text-sm leading-[14px]">{item.name}</p>
    </div>
  );
};

export default SymptomSelector;
