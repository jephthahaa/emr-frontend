"use client";
import { HotelO1, Video01Icon } from "@/assets/icons";
import { Input } from "@/components/FormElements";
import TextArea from "@/components/FormElements/TextArea";
import Button from "@/components/misc/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { IGetAppointmentSlots } from "@/types";
import { cn } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const appointmentMode = [
  {
    id: "virtual",
    label: "Virtual",
    Icon: Video01Icon,
  },
  {
    id: "visit",
    label: "Visit",
    Icon: HotelO1,
  },
];

type AppointmentData = {
  reason: string;
  notes: string;
};

const StepTwoView = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const slotId = useAppSelector((state) => state.appointment.selectedSlotId);

  const data = queryClient.getQueryData<IGetAppointmentSlots>([
    "patient",
    "appointmentSlots",
    id,
  ]);

  const selectSlot = data?.data.find((item) => item.id === slotId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AppointmentData>();

  const onSubmit = (data: AppointmentData) => {
    dispatch(action.appointment.setNotes(data.notes));
    dispatch(action.appointment.setReason(data.reason));
    setCurrentStep((p) => p + 1);
  };

  useEffect(() => {
    if (!selectSlot) {
      setCurrentStep(0);
    }
  }, [selectSlot, setCurrentStep]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-8 rounded-xl border border-gray-200 bg-white p-8"
    >
      <p className="text-xl font-bold leading-5">Reason for Visit</p>
      <div className="flex flex-col">
        <Input
          label="Reason"
          placeholder="Enter reason for appointment"
          error={errors.reason}
          {...register("reason", {
            required: "Please state reason for appointment",
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium">Appointment Type</p>
        <div className="flex flex-row gap-4">
          {appointmentMode.map((option) => (
            <div
              key={option.id}
              // onClick={() => setSelectedAppointmentMode(option.id)}
              className={cn(
                "flex flex-row items-center gap-1.5 rounded-full px-4 py-2 duration-100",
                option.id === selectSlot?.type
                  ? "border border-warning-600 bg-warning-50 text-warning-600"
                  : "bg-gray-100 text-black",
              )}
            >
              <option.Icon className="h-4 w-4" />
              <p className="text-sm">{option.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium leading-4">Additional Information</p>
        <TextArea
          className="h-28"
          placeholder="Enter additional notes"
          {...register("notes", { required: "Please enter additional notes" })}
          error={errors.notes}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button
          type="button"
          onClick={() => setCurrentStep((p) => p - 1)}
          variant="outline"
          className="px-6"
        >
          Back
        </Button>
        <Button
          disabled={
            !(watch("notes")?.length > 3) || !(watch("reason")?.length > 3)
          }
          type="submit"
          variant="primary"
          className="w-fit"
          primaryClassname="px-6"
        >
          Confirm booking
        </Button>
      </div>
    </form>
  );
};

export default StepTwoView;
