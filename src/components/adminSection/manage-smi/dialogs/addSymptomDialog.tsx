"use client";
import { Button as ShadButton } from "@/components/ui/button";
import React from "react";
import { X } from "lucide-react";
import ShadSelect from "@/components/misc/shadSelect";
import Button from "@/components/misc/button";
import { SYMPTOMS_TYPES } from "@/constants";
import { Input } from "@/components/FormElements";
import { ISymptom } from "@/types";
import useZomujoApi from "@/services/zomujoApi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const symptomTypes = SYMPTOMS_TYPES.map((item) => ({
  value: item,
  label: item,
}));

type InputFields = Omit<ISymptom, "id">;

const AddSymptomDialog = ({
  onClose,
  item,
}: {
  onClose: () => void;
  item?: ISymptom;
}) => {
  const isEdit = item !== undefined;
  const queryClient = useQueryClient();
  const { putSymptom, postSymptom } = useZomujoApi(false).admin.symptoms;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<InputFields>({
    defaultValues: {
      name: item?.name ?? "",
      type: item?.type ?? "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin", "symptoms", isEdit ? item.id : "add"],
    mutationFn: (data: InputFields) => {
      return isEdit ? putSymptom(item.id, data) : postSymptom(data);
    },
    onSuccess: async () => {
      toast.success("Symptoms Added Successfully");
      await queryClient.invalidateQueries({
        queryKey: ["admin", "smi", "Symptoms"],
      });
      onClose();
    },
    onError: (error) => {
      toast.error("An error occurred!");
      console.log(error);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="flex w-[490px] flex-col gap-6 rounded-xl bg-white p-6 duration-100"
    >
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-bold">{isEdit ? "Edit" : "Add"} Symptom</p>

        <ShadButton
          type="button"
          onClick={onClose}
          variant="outline"
          className="-mr-1 -mt-1 h-8 w-8 rounded-full p-0 text-black"
        >
          <X className="h-4 w-4 text-black" />
        </ShadButton>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <Input
            label="Name"
            placeholder="Symptom Name"
            className="w-full"
            {...register("name", { required: true })}
            error={errors.name}
          />
        </div>
        <div>
          <p className="mb-1">Type</p>
          <ShadSelect
            placeholder="Select option"
            value={watch("type")}
            onChange={(val) => setValue("type", val)}
            options={symptomTypes}
          />
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-3">
        <Button isLoading={isPending} className="w-fit" primaryClassname="px-4">
          {isEdit ? "Update" : "Add"} Symptom
        </Button>
      </div>
    </form>
  );
};
export default AddSymptomDialog;
