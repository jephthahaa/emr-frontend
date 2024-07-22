import Button from "@/components/misc/button";
import useZomujoApi from "@/services/zomujoApi";
import { wait } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const PatientDetailsRecordStatusModal = ({
  recordStatus,
}: {
  recordStatus: "not-approved" | "not-sent";
}) => {
  const queryClient = useQueryClient();
  const { postRecordRequest } = useZomujoApi(false).doctors.records;
  const { id } = useParams<{ id: string }>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["patients", recordStatus, id ?? ""],
    mutationFn: async () =>
      ({
        "not-approved": async () => {
          await wait(1000);
          return await queryClient.invalidateQueries({
            queryKey: ["patients", "check-records", id ?? ""],
          });
        },
        "not-sent": () => postRecordRequest({ patientId: id }),
      })[recordStatus](),
    onSuccess: () => {
      const run = {
        "not-approved": async () => {
          await queryClient.invalidateQueries({
            queryKey: ["patients", "check-records", id ?? ""],
          });
          toast.success("Record status refreshed");
        },
        "not-sent": async () => {
          await queryClient.invalidateQueries({
            queryKey: ["patients", "check-records", id ?? ""],
          });
          toast.success("Record request Sent");
        },
      }[recordStatus];

      run();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  return (
    <div className="relative flex w-[510px] flex-col items-center gap-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl font-bold leading-6">
          {
            {
              "not-approved": "Request Not Approved",
              "not-sent": "Request access to patient records",
            }[recordStatus]
          }
        </p>
        <p className="w-[290px] text-center text-gray-500">
          {
            {
              "not-approved": "Patient has not approved request yet.",
              "not-sent":
                "Send a request to the selected patient to access their medical records.",
            }[recordStatus]
          }
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <Button
          isLoading={isPending}
          disabled={isPending}
          type={"button"}
          variant={
            (
              {
                "not-approved": "outline",
                "not-sent": "primary",
              } as const
            )[recordStatus]
          }
          onClick={() => mutate()}
          className="w-[348px] border-transparent bg-gray-50 hover:bg-gray-100"
        >
          {
            {
              "not-approved": "Refresh",
              "not-sent": "Send Request",
            }[recordStatus]
          }
        </Button>
      </div>
    </div>
  );
};

export default PatientDetailsRecordStatusModal;
