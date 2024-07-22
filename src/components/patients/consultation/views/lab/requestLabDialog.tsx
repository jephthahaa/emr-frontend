import { Input } from "@/components/FormElements";
import TextArea from "@/components/FormElements/TextArea";
import Button from "@/components/misc/button";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useAppSelector } from "@/hooks";
import useZomujoApi from "@/services/zomujoApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  lab: z.string({ required_error: "lab name is required" }).min(1),
  notes: z.string(),
});

type formFields = z.infer<typeof schema>;

const RequestLabDialog = ({ onClose }: { onClose: () => void }) => {
  const id = useParams().id;
  const queryClient = useQueryClient();
  const { postLab } = useZomujoApi(false).doctors.records;
  const consultationId = useAppSelector(
    (state) => state.consultation.activeConsultationDetails?.id,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["consultation", "request", "labs", consultationId],
    mutationFn: postLab,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["consultation", "labs", id],
      });
      toast.success("labs requested");
      onClose();
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          ...data,
          consultationId: consultationId!,
        }),
      )}
      className="flex w-[460px] flex-col rounded-lg bg-white p-6"
    >
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold">Request Lab</p>
        <button type="button" onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <div>
          <Input
            className="w-full border-gray-200 bg-white"
            placeholder="Lab name"
            {...register("lab", { required: true })}
            error={errors.lab}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="font-medium leading-4">Notes</p>
          <TextArea
            className="h-28"
            placeholder="Enter additional notes"
            {...register("notes")}
            error={errors.notes}
          />
        </div>
        <Button disabled={isPending} className="w-full">
          {isPending ? <LoadingSpinner size={18} color="#ffffff" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default RequestLabDialog;
