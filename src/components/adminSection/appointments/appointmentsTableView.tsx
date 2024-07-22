"use client";
import { Input } from "@/components/FormElements";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useDebounce } from "@/hooks/useDebouce";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AppointmentsTable from "./appointmentsTable";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { TableFilterButton } from "@/components/tables/ filterOrSort/tableFilterButton";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import { useSearchParams } from "next/navigation";

const AppointmentsTableView = () => {
  const searchParams = useSearchParams();
  const filterStatus = searchParams.get("status") ?? "";
  const filterType = searchParams.get("type") ?? "";
  const filterSort = searchParams.get("sort") ?? "";
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const { getAppointments } = useZomujoApi(false).admin;

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin",
      "appointments",
      page,
      searchText,
      filterStatus,
      filterType,
      filterSort,
    ],
    queryFn: () =>
      getAppointments({
        limit: 25,
        page: page,
        search: searchText,
        status: filterStatus,
        type: filterType,
        sort: filterSort,
      }),
  });

  const appointments = data?.data ?? [];

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Input
            className="w-[330px] border-gray-200 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<FiSearch className="h-5 w-5" />}
            placeholder="Search Appointments"
          />
          <TableFilterButton
            keyParam="status"
            label="Status"
            multiple
            options={[
              { value: "completed", label: "Completed" },
              { value: "pending", label: "Pending" },
              { value: "accepted", label: "Accepted" },
              { value: "cancelled", label: "Cancelled" },
              { value: "declined", label: "Declined" },
            ]}
          />
          <TableFilterButton
            keyParam="type"
            label="Type"
            multiple
            options={[
              { value: "virtual", label: "Virtual" },
              { value: "visit", label: "Visit" },
            ]}
          />
        </div>
        <TableSortButton
          options={[
            { value: "date", label: "Date" },
            { value: "status", label: "Status" },
            { value: "type", label: "Type" },
          ]}
        />
      </div>
      <div className="relative h-[800px]">
        <AppointmentsTable
          data={appointments}
          currentPage={page}
          onChangePage={(val) => setPage(val)}
          totalPages={Math.ceil((data?.total ?? 1) / 25)}
        />
      </div>
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner size={32} />
        </div>
      )}
    </div>
  );
};

export default AppointmentsTableView;
