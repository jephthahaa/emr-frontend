import React, { useEffect } from "react";
import Accordion from "../../patientsDetails/views/lifestyleNfamily/components/accordion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { format, formatDistance } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { IApiResponse, IDiagnosis, ILab } from "@/types";

const ConsultationsSummuryView = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { consultationState, symptoms } = useAppSelector(
    (state) => state.consultation,
  );

  const labs = queryClient.getQueryData<IApiResponse<ILab[]>>([
    "consultation",
    "labs",
    id,
  ]);
  const diagnosis = queryClient.getQueryData<IApiResponse<IDiagnosis[]>>([
    "consultation",
    "diagnosis",
    id,
  ]);

  useEffect(() => {
    dispatch(action.consultation.prepareSymptomsExport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symptoms]);

  return (
    <div className="flex h-full w-[255px] shrink-0 flex-col gap-6 border-l border-l-gray-200  bg-grayscale-50 p-4">
      <p className="font-bold">Consultation Summary</p>
      <div className="flex flex-col gap-6">
        <Accordion
          label="Complaints"
          labelClassName="text-sm"
          initialOpen={false}
        >
          <div className="flex flex-col gap-3 pt-2">
            <p className="text-sm text-gray-500">
              {consultationState.complaints.join(", ")}
            </p>
          </div>
          {consultationState.complaintsDuration && (
            <div className="flex flex-col pt-2 text-sm">
              <p>Duration</p>
              <p className="text-gray-500">
                {format(
                  new Date(consultationState.complaintsDuration),
                  "dd MMMM yyyy",
                )}
                (
                {formatDistance(
                  new Date(consultationState.complaintsDuration),
                  new Date(),
                  { addSuffix: true },
                )}
                )
              </p>
            </div>
          )}
        </Accordion>
        <Accordion
          label="Symptoms"
          labelClassName="text-sm"
          initialOpen={false}
        >
          <div className="flex flex-col gap-3 pt-2">
            {Object.keys(consultationState.sypmtoms)
              .filter((key) => consultationState.sypmtoms[key] !== undefined)
              .map((key) => (
                <div key={key} className="text-sm">
                  <p className="">{key}</p>
                  <p className="flex flex-row gap-1 text-gray-500">
                    {consultationState.sypmtoms[key].symptoms.join(", ")}
                  </p>
                  {consultationState.sypmtoms[key].notes.length > 0 && (
                    <div className="mt-2 min-h-[56px] rounded-lg bg-grayscale-100 p-2">
                      <p className="text-sm leading-[15px] text-gray-500">
                        {consultationState.sypmtoms[key].notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </Accordion>
        <Accordion label="Labs" labelClassName="text-sm" initialOpen={false}>
          {labs && labs.data.length > 0 && (
            <div className="flex flex-col gap-1 pt-2">
              <p className="text-sm font-semibold">Requested Labs</p>
              <hr />
              {labs.data.map((lab) => (
                <div key={lab.id} className="flex flex-col">
                  <p className="text-sm">
                    {lab.lab} - {lab.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Accordion>
        <Accordion
          label="Diagnose & Prescibe"
          labelClassName="text-sm"
          initialOpen={false}
        >
          {diagnosis && diagnosis.data.length > 0 && (
            <div className="flex flex-col gap-1 pt-2">
              <p className="text-sm font-semibold">Existing Conditions</p>
              <hr />
              {diagnosis.data.map((diagnosis) => (
                <div key={diagnosis.id} className="flex flex-col">
                  <p className="text-sm">
                    {diagnosis.name} - {diagnosis.code}
                  </p>
                  <p className="text-sm text-gray-500"></p>
                </div>
              ))}
            </div>
          )}
          {consultationState.diagnosis.length > 0 && (
            <div className="flex flex-col gap-1 pt-2">
              <p className="text-sm font-medium">New Condition</p>
              <hr />
              {consultationState.diagnosis.map((diagnosis, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-sm">
                    {diagnosis.name} - {diagnosis.code}
                  </p>
                  <p className="text-sm text-gray-500"></p>
                </div>
              ))}
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default ConsultationsSummuryView;
