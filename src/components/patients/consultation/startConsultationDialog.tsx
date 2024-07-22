import Button from "@/components/misc/button";
import socket from "@/services/socketIO";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const StartConsultationDialog = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const session = useSession();
  const { id } = useParams<{ id: string }>();
  const { postStartConsultation } = useZomujoApi(false).doctors.records;

  const { mutate, isPending } = useMutation({
    mutationKey: ["consultation", "start", id],
    mutationFn: () => postStartConsultation({ patientId: id }),
    onSuccess: (data) => {
      socket.emit("ConsultationStartEvent", {
        patientId: id,
        doctorId: session.data?.user.id,
        consultationId: data.data.id,
      });
      router.push(`/patients/${id}/consultation`);
    },
    onError: (error) => {
      const err = error as unknown as AxiosError;
      toast.error((err.response as any).data.message);
    },
  });

  return (
    <div className="relative flex w-[510px] flex-col items-center gap-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl font-bold leading-6">Start Consultation?</p>
        <p className="w-[290px] text-center text-gray-500">
          you are about to start a consultation with this patient
        </p>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-4">
        <Button
          onClick={onClose}
          type="button"
          variant="outline"
          className="flex w-[195px]"
        >
          Cancel
        </Button>
        <Button
          isLoading={isPending}
          disabled={isPending}
          type={"button"}
          variant={"primary"}
          onClick={() => mutate()}
          className="w-[195px]"
        >
          Start Consultation
        </Button>
      </div>
    </div>
  );
};

export default StartConsultationDialog;
