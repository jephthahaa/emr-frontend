import TextArea from "@/components/FormElements/TextArea";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useDebounce } from "@/hooks/useDebouce";
import { action } from "@/redux";
import React, { useEffect, useState } from "react";

const ConsultationNotesView = () => {
  const dispatch = useAppDispatch();
  const consultationsNotes = useAppSelector(
    (state) => state.consultation.consultationState.consultationNotes,
  );
  const [notes, setNotes] = useState(consultationsNotes);
  const debouncedNotes = useDebounce(notes, 500);

  useEffect(() => {
    dispatch(action.consultation.setConsultationNotes(debouncedNotes));
  }, [debouncedNotes, dispatch]);

  return (
    <div className="flex h-full w-[255px] shrink-0 flex-col gap-4 border-l border-l-gray-200  bg-grayscale-50 p-4">
      <p className="font-bold">Consultation Notes</p>
      <div className="flex flex-col gap-4">
        <TextArea
          className="min-h-[260px]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ConsultationNotesView;
