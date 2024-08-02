"use client";
import { Button as ShadButton } from "@/components/ui/button";
import React from "react";
import { X } from "lucide-react";
import Button from "@/components/misc/button";
import { Input } from "@/components/FormElements";
import TextArea from "@/components/FormElements/TextArea";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMedicine } from "@/types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type InputFields = Omit<IMedicine, "id">;

const AddMedicineDialog = ({
  onClose,
  item,
}: {
  onClose: () => void;
  item?: IMedicine;
}) => {
  const isEdit = item !== undefined;
  const queryClient = useQueryClient();
  const { putMedicine, postMedicine } = useZomujoApi(false).admin.medicines;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputFields>({
    defaultValues: {
      name: item?.name ?? "",
      description: item?.description ?? "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin", "medicine", isEdit ? item.id : "add"],
    mutationFn: (data: InputFields) => {
      return isEdit ? putMedicine(item.id, data) : postMedicine(data);
    },
    onSuccess: async () => {
      toast.success("Medicine Added Successfully");
      await queryClient.invalidateQueries({
        queryKey: ["admin", "smi", "Medicines"],
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
        <p className="text-2xl font-bold">{isEdit ? "Edit" : "Add"} Medicine</p>

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
            placeholder="Medicine Name"
            className="w-full"
            {...register("name", { required: true })}
            error={errors.name}
          />
        </div>
        <div>
          <TextArea
            label="Description"
            labelClassName="text-base"
            className="h-[120px] w-full"
            placeholder="Enter medicine description"
            {...register("description", { required: true })}
            error={errors.description}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-3">
        <Button isLoading={isPending} className="w-fit" primaryClassname="px-4">
          {isEdit ? "Update" : "Add"} Medicine
        </Button>
      </div>
    </form>
  );
};
export default AddMedicineDialog;
