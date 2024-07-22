import { IPatient } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export const useGetPatientRecords = (id: string) => {
  const queryClient = useQueryClient();
  const patient = queryClient.getQueryData<IPatient>([
    "patients",
    "details",
    "full-records",
    id,
  ]);

  return patient;
};
