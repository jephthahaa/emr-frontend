import React, { useState } from "react";
import { Input } from "@/components/FormElements";
import { FiSearch } from "react-icons/fi";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import LoadingProgressBar from "@/components/misc/loadingProgressBar";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebouce";
import FileItem from "@/components/patients/patientsDetails/views/patientOverview/components/fileItem";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";

const PrescriptionsView = ({ patientId }: { patientId: string }) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);

  const { getAllPrescriptions } = useZomujoApi(false).patients.records;

  const { data, isLoading } = useQuery({
    queryKey: ["patients", "prescriptions", searchText],
    queryFn: () => getAllPrescriptions({ search: searchText }),
  });

  const prescriptions = data?.data || [];

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col gap-6">
        <p className="text-xl font-bold">Prescriptions</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Input
              className="w-[330px] border-gray-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<FiSearch className="h-5 w-5" />}
              placeholder="Search prescriptions"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <TableSortButton
              orderPos="left"
              options={[
                { value: "lab", label: "Lab" },
                { value: "createdAt", label: "Date" },
              ]}
            />
          </div>
        </div>
        <LoadingProgressBar isDone={!isLoading} />
      </div>
      <div className="grid h-[492px] grid-cols-4 gap-3 overflow-y-scroll">
        {prescriptions.map((prescription) => (
          <FileItem key={prescription.id} data={prescription} />
        ))}
      </div>
    </div>
  );
};
export default PrescriptionsView;
