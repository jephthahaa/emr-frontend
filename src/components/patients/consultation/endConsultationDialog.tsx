import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { CONSULTATION_STEPS } from "@/constants";
import TextArea from "@/components/FormElements/TextArea";
import { RootState, action } from "@/redux";
import { ValidateError, cn } from "@/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import socket from "@/services/socketIO";

const EndConsultationDialog = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { activeConsultationDetails, currentStep, consultationState } =
    useAppSelector((state) => state.consultation);
  const { endConsultation, completeConsultation, addFutureVisit } =
    useZomujoApi(false).doctors.records;

  const isEnd = currentStep === CONSULTATION_STEPS.length - 1;
  const [text, setText] = useState(
    isEnd ? consultationState.consultationNotes : "",
  );
  const id = activeConsultationDetails?.id;

  const { mutate, isPending } = useMutation({
    mutationKey: ["consultation", "end", "complete", id],
    mutationFn: () => {
      if (id === undefined) {
        throw new ValidateError("Consultation ID not found");
      }
      if (isEnd) {
        Validate(consultationState);

        return Promise.allSettled([
          consultationState.futureVisit
            ? addFutureVisit({
                consultationId: id,
                message: consultationState.futureVisit!.message,
                sendMessageAt: format(
                  new Date(consultationState.futureVisit!.dateTime!),
                  "yyyy-MM-dd HH:mm:ss",
                ),
                type: consultationState.futureVisit!.visitType,
              })
            : Promise.resolve(),
          completeConsultation({
            consultationId: id,
            notes: text,
          }),
        ]);
      } else {
        return endConsultation({
          consultationId: id,
          reason: text,
        });
      }
    },
    onSuccess: () => {
      socket.emit("ConsultationEndEvent", {
        patientId: activeConsultationDetails?.userId,
      });
      if (isEnd) {
        toast.success("Consultation Completed!");
      } else {
        toast.success("Consultation Ended!");
      }
      onClose();
      dispatch(action.consultation.resetConsultationState());
      router.replace("/appointments");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else if (error instanceof ValidateError) {
        toast.error(error.message);
      } else {
        console.log(error);
        toast.error("An error occurred");
      }
    },
  });

  return (
    <div className="relative flex w-[510px] flex-col gap-8 rounded-xl bg-white p-5 shadow-xl">
      <div className="flex flex-col items-start gap-4">
        <p className="text-2xl font-bold leading-8">
          {isEnd ? "Complete Consultation" : "End Consultation"}
        </p>
        <p className=" text-gray-500">
          {isEnd
            ? "You are about to complete the consultation with this patient. Proceed?"
            : "Are you sure you want to end this consultation? all progress will be lost."}
        </p>
        <div className="flex w-full flex-1 flex-col items-stretch">
          <TextArea
            label={isEnd ? "Notes" : "Reason"}
            className={cn("w-full", isEnd ? "h-36" : "h-24")}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-end gap-6">
        <div className="space-x-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className=""
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => mutate()}
            variant={isEnd ? "default" : "destructive"}
            className={cn(
              "min-w-[150px]",
              isEnd && "bg-primary hover:bg-primaryDark",
            )}
          >
            {isPending ? (
              <Oval color="#fff" height={20} width={20} strokeWidth={3} />
            ) : isEnd ? (
              "Complete Consultation"
            ) : (
              "End Consultation"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EndConsultationDialog;

const Validate = (state: RootState["consultation"]["consultationState"]) => {
  if (state.futureVisit) {
    if (state.futureVisit.dateTime === undefined) {
      throw new ValidateError("Future visit date not set");
    }
    if (new Date(state.futureVisit.dateTime) < new Date()) {
      throw new ValidateError("Future visit date is in the past");
    }
    if (state.futureVisit.visitType === "") {
      throw new ValidateError("No visit type selected");
    }
    if (state.futureVisit.message === "") {
      throw new ValidateError("No message for future visit");
    }
  }
};
