import {
  IApiResponse,
  IAppointmentRequestShowDialog,
  IPatientGetAppointmentRequest,
} from "@/types";
import React from "react";
import { Button } from "../ui/button";
import LoadingSpinner from "../misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { cn } from "@/utils";
import { StepOneView } from "../patientsSection/bookDoctor";

type AppointmentRequestDialogsProps = {
  data: IAppointmentRequestShowDialog;
  onClose: () => void;
};

const PatientAppointmentRequestDialogs = ({
  data,
  onClose,
}: AppointmentRequestDialogsProps) => {
  const payload = data!;
  const queryClient = useQueryClient();
  const { patchCancelAppointmentRequest } = useZomujoApi(false).patients;

  const { mutate, isPending } = useMutation({
    mutationKey: ["appointment", payload.action, payload.requestId],
    mutationFn: async () => {
      switch (payload.action) {
        case "accept":
          break;
        case "decline":
          break;
        case "cancel":
          return patchCancelAppointmentRequest(payload.requestId);
        case "rechedule":
          break;

        default:
          break;
      }
    },
    onSuccess: async () => {
      switch (payload.action) {
        case "accept":
          toast.success("Appointment request accepted");
          break;
        case "decline":
          toast.success("Appointment request declined");
          break;
        case "cancel":
          toast.success("Appointment cancelled");
          break;
        case "rechedule":
          toast.success("Appointment recheduled");
          break;

        default:
          break;
      }
      await queryClient.invalidateQueries({
        queryKey: ["patients", "appointments", "requests"],
      });

      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  const appointmentRequests = queryClient.getQueryData<
    IApiResponse<IPatientGetAppointmentRequest[]>
  >(["patients", "appointments", "requests"]);

  const Request = appointmentRequests?.data.find(
    (item) => item.id === payload.requestId,
  );

  if (payload.action === "rechedule") {
    return (
      <div className="w-[500px]">
        <StepOneView
          rescheduleData={{
            requestId: payload.requestId,
            doctorId: Request?.doctor.id!,
          }}
          standalone={true}
          onClose={onClose}
          setCurrentStep={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="relative flex w-[510px] flex-col gap-8 rounded-xl bg-white p-5 shadow-xl">
      <div className="flex flex-col items-start gap-4">
        <p className="text-2xl font-bold leading-8">
          {
            {
              accept: "Accept Appointment Request",
              decline: "Decline Appointment Request",
              cancel: "Cancel Appointment",
              rechedule: "Rechedule Appointment",
            }[payload.action]
          }
        </p>
        <p className=" text-gray-500">
          {
            {
              accept: ``,
              decline: ``,
              cancel: `Are you sure you want to cancel Dr. ${Request?.doctor.firstName} ${Request?.doctor.lastName}'s appointment on ${Request?.date}? This action is irreversible.`,
              rechedule: "Rechedule Appointment",
            }[payload.action]
          }
        </p>
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
            variant={
              (
                {
                  accept: "default",
                  decline: "destructive",
                  cancel: "destructive",
                  rechedule: "default",
                } as const
              )[payload.action]
            }
            className={cn(
              {
                accept: "bg-primary",
                decline: "",
                cancel: "h-10 min-w-[150px]",
                rechedule: "",
              }[payload.action],
            )}
          >
            {isPending ? (
              <LoadingSpinner size={18} color="#ffffff" />
            ) : (
              {
                accept: "Accept",
                decline: "Decline",
                cancel: "Cancel Appointment",
                rechedule: "Rechedule",
              }[payload.action]
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentRequestDialogs;
