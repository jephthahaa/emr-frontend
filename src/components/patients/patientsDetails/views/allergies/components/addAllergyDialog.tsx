"use client";
import { HotelO1, Video01Icon } from "@/assets/icons";
import { cn } from "@/utils";
import React, { useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { Input } from "../../../../../FormElements";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wait } from "@/utils";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Button from "@/components/misc/button";
import Select from "@/components/FormElements/Select";

const allergyType = [
  {
    id: "medication",
    label: "Medication",
    Icon: HotelO1,
  },
  {
    id: "non-medication",
    label: "Non Medication",
    Icon: Video01Icon,
  },
  {
    id: "food",
    label: "Food",
    Icon: HotelO1,
  },
];

const formSchema = z.object({
  name: z.string({ required_error: "name is required" }).min(3),
  severity: z.string().min(3),
  type: z.string().min(3),
});

type FormFields = z.infer<typeof formSchema>;

const AddAllergyDialog = ({ onClose }: { onClose: () => void }) => {
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  const { addAllergy } = useZomujoApi(false).doctors.records;

  const defaultValues: FormFields = {
    name: "",
    severity: "",
    type: allergyType[0].id,
  };
  const {
    setValue,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["patient", "details", "surgery", id],
    mutationFn: (data: FormFields) => addAllergy(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["patients", "details", "full-records", id],
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
        <p className="text-2xl font-bold">Add Allergy</p>
        <button type="button" onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="my-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="font-medium">Allergy type</p>
          <div className="flex flex-row gap-4">
            {allergyType.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setValue("type", option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-2 duration-100",
                  option.id === watch("type")
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <option.Icon className="h-4 w-4" />
                <p className="text-sm">{option.label}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="Allergy"
            className="w-full border-gray-200 bg-white"
            placeholder="Eg; Dust"
            {...register("name", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label="Severity"
            placeholder="Severity"
            {...register("severity", { required: true })}
            className=""
          >
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </Select>
        </div>
      </div>
      <Button isLoading={isPending} variant="primary" primaryClassname="px-4">
        Add
      </Button>
    </form>
  );
};

export default AddAllergyDialog;
