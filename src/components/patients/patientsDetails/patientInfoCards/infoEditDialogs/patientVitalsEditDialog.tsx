import { Input } from "@/components/FormElements";
import Button from "@/components/misc/button";
import useZomujoApi from "@/services/zomujoApi";
import { IPatient } from "@/types";
import { wait } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  weight: z.number({ required_error: "weight is required" }).min(1),
  heartRate: z.number({ required_error: "heart rate is required" }).min(1),
  bloodSugarLevel: z
    .number({ required_error: "blood sugar level is required" })
    .min(1),
  temperature: z.number({ required_error: "temperature is required" }).min(1),
  bloodPressure: z.object({
    systolic: z.number(),
    diastolic: z.number(),
  }),
});

type FormFields = z.infer<typeof formSchema>;

const PatientVitalsEditDialog = ({
  onClose,
  patient,
}: {
  onClose: () => void;
  patient: IPatient;
}) => {
  const queryClient = useQueryClient();
  const { patchPatientRecord } = useZomujoApi(false).doctors.records;

  const defaultValues: FormFields = {
    weight: patient.weight ?? 0,
    heartRate: patient.heartRate ?? 0,
    bloodSugarLevel: patient.bloodSugarLevel ?? 0,
    temperature: patient.temperature ?? 0,
    bloodPressure: patient.bloodPressure ?? {
      systolic: 120,
      diastolic: 80,
    },
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["patient", "details", "vitals", patient.id],
    mutationFn: (data: FormFields) => patchPatientRecord(patient.id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["patients", "details", "full-records", patient.id],
      });
      toast.success("Patient details updated successfully!");
      await wait(500);
      onClose();
    },
    onError: () => {
      toast.error("An error occured");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="flex w-[460px] flex-col rounded-lg bg-white p-6"
    >
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold">Edit Vitals</p>

        <button type="button" onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="my-6 flex flex-col gap-6">
        <div className="flex flex-col">
          <Input
            label="Weight"
            type="number"
            step={0.01}
            placeholder="Enter weight(kg)"
            {...register("weight", { required: true, valueAsNumber: true })}
            error={errors.weight}
          />
        </div>
        <div className="flex flex-col">
          <Input
            label="Heart Rate"
            type="number"
            placeholder="Enter heart rate"
            {...register("heartRate", { required: true, valueAsNumber: true })}
            error={errors.heartRate}
          />
        </div>
        <div className="flex flex-col">
          <Input
            label="Blood Suger Level"
            type="number"
            step={0.01}
            placeholder="Enter blood suger level"
            {...register("bloodSugarLevel", {
              required: true,
              valueAsNumber: true,
            })}
            error={errors.bloodSugarLevel}
          />
        </div>
        <div className="flex flex-col">
          <Input
            label="Temperature"
            type="number"
            step={0.01}
            placeholder="Enter temperature(C)"
            {...register("temperature", {
              required: true,
              valueAsNumber: true,
            })}
            error={errors.temperature}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <p>Blood Pressure</p>
          <div className="flex flex-1 flex-row gap-2">
            <div className="flex flex-1 flex-col">
              <Input
                type="number"
                placeholder="Systolic"
                {...register("bloodPressure.systolic", {
                  required: true,
                  valueAsNumber: true,
                })}
                error={errors.bloodPressure?.systolic}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Input
                type="number"
                placeholder="Diastolic"
                {...register("bloodPressure.diastolic", {
                  required: true,
                  valueAsNumber: true,
                })}
                error={errors.bloodPressure?.diastolic}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        isLoading={isPending}
        variant="primary"
        primaryClassname="px-4 w-full"
      >
        Save
      </Button>
    </form>
  );
};

export default PatientVitalsEditDialog;
