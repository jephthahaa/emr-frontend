"use client";
import React from "react";
import { TimeHalfPassIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { CONSULTATION_STEPS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState, action } from "@/redux";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Dialog from "@/components/misc/dialog";
import EndConsultationDialog from "./endConsultationDialog";

const ConsultationHeader = () => {
  const dispatch = useAppDispatch();
  const {
    addSymptom,
    patchUpdateConsultationStep,
    postDiagnoses,
    postPrescriptions,
  } = useZomujoApi(false).doctors.records;
  const { currentStep, consultationState, activeConsultationDetails } =
    useAppSelector((state) => state.consultation);

  const { mutate, isPending } = useMutation({
    mutationKey: [
      "consulttation",
      "save",
      "progress",
      currentStep,
      activeConsultationDetails?.id!,
    ],
    mutationFn: async () => {
      Validate(currentStep, consultationState);
      switch (currentStep) {
        case 0:
          return addSymptom({
            complaints: consultationState.complaints,
            symptoms: consultationState.sypmtoms,
            to: new Date().toISOString(),
            from: consultationState.complaintsDuration!.toString(),
            consultationId: activeConsultationDetails?.id!,
            medicinesTaken: consultationState.medicineTaken,
          });
        case 1:
          return patchUpdateConsultationStep({
            consultationId: activeConsultationDetails?.id!,
            step: 2,
          });
        case 2:
          const { diagnosis } = consultationState;
          if (diagnosis.length < 1) {
            return patchUpdateConsultationStep({
              consultationId: activeConsultationDetails?.id!,
              step: 3,
            });
          }

          return Promise.all([
            patchUpdateConsultationStep({
              consultationId: activeConsultationDetails?.id!,
              step: 3,
            }),
            postDiagnoses({
              consultationId: activeConsultationDetails?.id!,
              diagnoses: diagnosis,
            }),
            postPrescriptions({
              consultationId: activeConsultationDetails?.id!,
              prescriptions: consultationState.prescriptions,
            }),
          ]);

        case 3:
          break;

        default:
          break;
      }
    },
    onSuccess: () => {
      toast.success(`${CONSULTATION_STEPS[currentStep].title} saved`);

      if (currentStep < 3) {
        dispatch(
          action.consultation.setCurrentStep(
            (currentStep + 1) % CONSULTATION_STEPS.length,
          ),
        );
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <header className="flex w-full flex-col gap-6 border-b border-gray-200 bg-white px-4 pb-4 pt-6">
        <div className="flex flex-row items-center gap-2.5">
          <p className="text-xl font-bold">Consultation</p>

          <div className="flex flex-row items-center gap-1 rounded-full bg-warning-50 px-2 py-1 text-warning-600">
            <TimeHalfPassIcon className="h-4 w-4" />
            <p className="text-xs">In-Progress</p>
          </div>
        </div>
      </header>
      <div className="flex w-full flex-row items-center justify-between border-b border-gray-200 bg-white p-6">
        <div className="flex flex-row items-center">
          {CONSULTATION_STEPS.map(({ title, icon: Icon }, index) => (
            <div
              key={title}
              className="relative -mx-1 flex items-center justify-center"
            >
              <div className="absolute">
                <p
                  className={cn(
                    "",
                    index === currentStep
                      ? "font-bold text-primaryDark"
                      : "font-medium text-gray-500",
                  )}
                >
                  {title}
                </p>
              </div>
              <Icon
                className={cn(
                  index === currentStep ? "text-primaryLight" : "text-gray-50",
                )}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center gap-4">
          {currentStep < CONSULTATION_STEPS.length - 1 && (
            <Button
              onClick={() => {
                dispatch(action.consultation.prepareSymptomsExport());
                mutate();
              }}
              variant="outline"
              className="w-[62px] p-0 font-medium"
            >
              {isPending ? (
                <LoadingSpinner size={18} stroke={3} color="#000000" />
              ) : (
                "Next"
              )}
            </Button>
          )}
          <Dialog dialogChild={EndConsultationDialog}>
            <Button
              variant="destructive"
              type="button"
              className="bg-error-50 font-medium text-error-600 hover:bg-error-75"
            >
              {currentStep === CONSULTATION_STEPS.length - 1
                ? "Complete"
                : "End"}{" "}
              Consultation
            </Button>
          </Dialog>
        </div>
      </div>
    </>
  );
};

const Validate = (
  currentIndex: number,
  state: RootState["consultation"]["consultationState"],
) => {
  switch (currentIndex) {
    case 0:
      if (state.complaints.length < 1) {
        throw Error("No complaints selected");
      }
      if (state.complaintsDuration === undefined) {
        throw Error("Duration date not set");
      }

      if (Object.keys(state.sypmtoms).length === 0) {
        throw Error("No symptoms have been specified");
      }
      break;

    case 3:
      if (state.futureVisit) {
        if (state.futureVisit.dateTime === undefined) {
          throw Error("Future visit date not set");
        }
        if (new Date(state.futureVisit.dateTime) < new Date()) {
          throw Error("Future visit date is in the past");
        }
        if (state.futureVisit.visitType === "") {
          throw Error("No visit type selected");
        }
        if (state.futureVisit.message === "") {
          throw Error("No message for future visit");
        }
      }
      break;

    default:
      break;
  }
};

export default ConsultationHeader;
