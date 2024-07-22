"use client";
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
import TextArea from "@/components/FormElements/TextArea";

const formSchema = z.object({
  name: z.string({ required_error: "surgery is required" }).min(3),
  additionalNotes: z.string().min(5).optional(),
});

type FormFields = z.infer<typeof formSchema>;

export const SurgeriesAddSheet = ({ onClose }: { onClose: () => void }) => {
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  const { addSurgery } = useZomujoApi(false).doctors.records;

  const defaultValues: FormFields = {
    name: "",
    additionalNotes: "",
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
    mutationKey: ["patient", "details", "surgery", id],
    mutationFn: (data: FormFields) => addSurgery(id, data),
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
      className="flex h-full flex-col justify-between gap-6 p-7"
    >
      <div className="flex flex-col gap-6">
        <p className="text-2xl font-bold leading-5">Add Surgery</p>
        <hr />
        <Input
          className="w-full border-gray-200 bg-white"
          placeholder="Surgery Name"
          {...register("name", { required: true })}
          error={errors.name}
        />
        <div className="flex flex-col gap-2.5">
          <p className="font-medium leading-4">Additional Notes</p>
          <TextArea
            className="h-28"
            placeholder="Enter additional notes"
            error={errors.additionalNotes}
            {...register("additionalNotes")}
          />
        </div>
      </div>
      <Button isLoading={isPending}>Save</Button>
    </form>
  );
};

export default SurgeriesAddSheet;
