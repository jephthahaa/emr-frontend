import { Input } from "@/components/FormElements";
import Select from "@/components/FormElements/Select";
import Button from "@/components/misc/button";
import useZomujoApi from "@/services/zomujoApi";
import { IPatient } from "@/types";
import { cn, wait } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const maritalStatusOptions = [
  {
    id: "single",
    label: "Single",
  },
  {
    id: "married",
    label: "Married",
  },
  {
    id: "devorced",
    label: "Devorced",
  },
  {
    id: "widowed",
    label: "Widowed",
  },
];

const denominationOptions = [
  {
    id: "christian",
    label: "Christian",
  },
  {
    id: "muslim",
    label: "Muslim",
  },
  {
    id: "other",
    label: "Other",
  },
];

const bloodGroupOptions = [
  {
    id: "a+",
    label: "A+",
  },
  {
    id: "b+",
    label: "B+",
  },
  {
    id: "o+",
    label: "O+",
  },
  {
    id: "ab+",
    label: "AB+",
  },
  {
    id: "a-",
    label: "A-",
  },
  {
    id: "b-",
    label: "B-",
  },
  {
    id: "o-",
    label: "O-",
  },
  {
    id: "ab-",
    label: "AB-",
  },
];

const formSchema = z.object({
  maritalStatus: z
    .string({ required_error: "marital status is required" })
    .min(6),
  denomination: z.string({ required_error: "denomination is required" }).min(5),
  height: z.number({ required_error: "height is required" }).min(10),
  bloodGroup: z.string({ required_error: "blood group is required" }).min(2),
});

type FormFields = z.infer<typeof formSchema>;

const PatientGeneralInfoEditDialog = ({
  onClose,
  patient,
}: {
  onClose: () => void;
  patient: IPatient;
}) => {
  const queryClient = useQueryClient();
  const { patchPatientRecord } = useZomujoApi(false).doctors.records;

  const defaultValues: FormFields = {
    bloodGroup: patient.bloodGroup ?? "",
    denomination: patient.denomination ?? denominationOptions[0].id,
    height: patient.height ?? 0,
    maritalStatus: patient.maritalStatus ?? maritalStatusOptions[0].id,
  };
  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["patient", "details", "general-info", patient.id],
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
        <p className="text-2xl font-bold">Edit General Info</p>
        <button type="button" onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="my-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="font-medium">Marital Status</p>
          <div className="flex flex-row gap-4">
            {maritalStatusOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setValue("maritalStatus", option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-2 duration-100",
                  option.id === watch("maritalStatus")
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <p className="text-sm">{option.label}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label="Denomination"
            labelClassName="text-base"
            placeholder="Select denomination"
            defaultValue=""
            {...register("denomination", { required: true })}
          >
            <option value="" disabled />
            {denominationOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <Input
            label="Height"
            type="number"
            placeholder="Enter height(cm)"
            {...register("height", { required: true, valueAsNumber: true })}
            error={errors.height}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label="Blood group"
            labelClassName="text-base"
            placeholder="Select blood group"
            defaultValue=""
            {...register("bloodGroup", { required: true })}
          >
            <option value="" disabled />
            {bloodGroupOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
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

export default PatientGeneralInfoEditDialog;
