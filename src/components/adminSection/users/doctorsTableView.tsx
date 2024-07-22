"use client";
import { Input } from "@/components/FormElements";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useDebounce } from "@/hooks/useDebouce";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import DoctorsTable from "./doctorsTable";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { TableFilterButton } from "@/components/tables/ filterOrSort/tableFilterButton";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import { useSearchParams } from "next/navigation";

const DoctorsTableView = () => {
  const searchParams = useSearchParams();
  const filterStatus = searchParams.get("status") ?? "";
  const filterConsult = searchParams.get("consult") ?? "";
  const filterSort = searchParams.get("sort") ?? "";
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const { getAllDoctors } = useZomujoApi().admin;

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin",
      "doctors",
      searchText,
      page,
      filterSort,
      filterStatus,
      filterConsult,
    ],
    queryFn: () =>
      getAllDoctors({
        limit: 15,
        page: page,
        search: searchText,
        sort: filterSort,
        status: filterStatus,
        consult: filterConsult,
      }),
  });

  const doctorsData = data?.data || [];

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          <Input
            className="w-[330px] border-gray-200 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<FiSearch className="h-5 w-5" />}
            placeholder="Search Doctors"
          />
          <TableFilterButton
            label="Status"
            keyParam="status"
            options={[
              { label: "Verified", value: "verified" },
              { label: "Unverified", value: "unverified" },
            ]}
          />
          <TableFilterButton
            label="Consult"
            keyParam="consult"
            options={[
              { label: "None", value: "none" },
              { label: "Had Consult", value: "had" },
            ]}
          />
        </div>
        <TableSortButton
          options={[
            { label: "Name", value: "name" },
            { label: "Recent Consult", value: "consult" },
            { label: "Status", value: "status" },
          ]}
        />
      </div>
      <div className="h-[800px]">
        <DoctorsTable
          data={doctorsData}
          currentPage={page}
          onChangePage={(val) => setPage(val)}
          totalPages={Math.ceil((data?.total ?? 1) / 25)}
        />
      </div>
      {isLoading && (
        <div className="flex h-[183px] w-full items-center justify-center">
          <LoadingSpinner size={32} />
        </div>
      )}
    </div>
  );
};

export default DoctorsTableView;
