import {
  IAppointmentRequestShowDialog,
  IGetAppointmentRequests,
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

const AppointmentRequestDialogs = ({
  data,
  onClose,
}: AppointmentRequestDialogsProps) => {
  const payload = data!;
  const queryClient = useQueryClient();
  const {
    acceptAppointmentRequest,
    declineAppointmentRequest,
    cancelAppointment,
  } = useZomujoApi(false).doctors.appointments;

  const { mutate, isPending } = useMutation({
    mutationKey: ["appointment", payload.action, payload.requestId],
    mutationFn: async () => {
      switch (payload.action) {
        case "accept":
          return acceptAppointmentRequest(payload);
        case "decline":
          return declineAppointmentRequest(payload);
        case "cancel":
          return cancelAppointment({
            ...payload,
            keepSlot: true,
          });
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
        queryKey: ["doctors", "appointmentRequests", 1],
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

  const appointmentRequests = queryClient.getQueryData<IGetAppointmentRequests>(
    ["doctors", "appointmentRequests"],
  );

  const Request = appointmentRequests?.data.find(
    (item) => item.id === payload.requestId,
  );

  if (payload.action === "rechedule") {
    return (
      <div className="w-[500px]">
        <StepOneView
          rescheduleData={{
            requestId: payload.requestId,
            doctorId: "",
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
              accept: `Confirm ${Request?.patient.firstName} ${Request?.patient.lastName}'s appointment on ${Request?.date}?`,
              decline: `Decline ${Request?.patient.firstName} ${Request?.patient.lastName}'s appointment on ${Request?.date}?`,
              cancel: `Are you sure you want to cancel ${Request?.patient.firstName} ${Request?.patient.lastName}'s appointment on ${Request?.date}? This action is irreversible.`,
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
                cancel: "",
                rechedule: "",
              }[payload.action],
            )}
          >
            {isPending ? (
              <LoadingSpinner size={20} />
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

export default AppointmentRequestDialogs;
