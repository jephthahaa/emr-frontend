import React, { useState } from "react";
import FileItem from "../components/fileItem";
import { Input } from "@/components/FormElements";
import { FiSearch } from "react-icons/fi";
import { TableFilterButton } from "@/components/tables/ filterOrSort/tableFilterButton";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebouce";
import PatientLabsTable from "@/components/tables/patientLabsTable";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import LoadingProgressBar from "@/components/misc/loadingProgressBar";

const statusFilterOptions = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

const LabRequests = ({ patientId }: { patientId: string }) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const filterStatus = searchParams.get("status") ?? "";
  const filterSort = searchParams.get("sort") ?? "";
  const [page, setPage] = useState(1);

  const { getAllLabs } = useZomujoApi(false).patients.records;
  const { getLabs } = useZomujoApi(false).doctors.records;

  const { data, isLoading } = useQuery({
    queryKey: ["patients", "labs", page, filterStatus, filterSort, searchText],
    queryFn: async () => {
      if (patientId) {
        return getLabs(patientId, {
          limit: 10,
          page,
          search: searchText,
          status: filterStatus,
          sort: filterSort,
        });
      } else {
        return getAllLabs({
          limit: 10,
          page,
          search: searchText,
          status: filterStatus,
          sort: filterSort,
        });
      }
    },
  });

  const tableData = data?.data ?? [];

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col gap-6">
        <p className="text-xl font-bold">Labs</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Input
              className="w-[330px] border-gray-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<FiSearch className="h-5 w-5" />}
              placeholder="Search lab"
            />

            <TableFilterButton
              keyParam="status"
              label="Status"
              options={statusFilterOptions}
              multiple
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <TableSortButton
              orderPos="left"
              options={[
                { value: "lab", label: "Lab" },
                { value: "status", label: "Status" },
                { value: "createdAt", label: "Date" },
              ]}
            />
          </div>
        </div>
        <LoadingProgressBar isDone={!isLoading} />
        <div className="h-[600px]">
          <PatientLabsTable
            data={tableData}
            currentPage={page}
            onChangePage={setPage}
            totalPages={Math.ceil((data?.total ?? 1) / 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default LabRequests;
