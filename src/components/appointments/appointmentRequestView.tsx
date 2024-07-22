"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../FormElements";
import { FiSearch } from "react-icons/fi";
import AppointmentRequestTable from "../tables/appointmentRequestTable";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../misc/loadingSpinner";
import { TableFilterButton } from "../tables/ filterOrSort/tableFilterButton";
import { useDebounce } from "@/hooks/useDebouce";
import { useSearchParams } from "next/navigation";
import { TableSortButton } from "../tables/ filterOrSort/tableSortButton";

const AppointmentRequestView = () => {
  const searchParams = useSearchParams();
  const filterStatus = searchParams.get("status") ?? "";
  const filterType = searchParams.get("type") ?? "";
  const filterSort = searchParams.get("sort") ?? "";
  const { getAppointmentRequests } = useZomujoApi(false).doctors.appointments;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);

  const { data: appointmentRequestsData, isLoading } = useQuery({
    queryKey: [
      "doctors",
      "appointmentRequests",
      page,
      searchText,
      filterStatus,
      filterType,
      filterSort,
    ],
    queryFn: () =>
      getAppointmentRequests({
        page: page < 1 ? 1 : page,
        limit: 15,
        search: searchText,
        status: filterStatus,
        type: filterType,
        sort: filterSort,
      }),
  });

  const requests = appointmentRequestsData?.data || [];

  useEffect(() => {
    const totalPages = Math.ceil((appointmentRequestsData?.total ?? 1) / 15);
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [appointmentRequestsData?.total, page]);

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-1 p-6 ">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          <Input
            className="w-[330px] border-gray-200 bg-white"
            icon={<FiSearch className="h-5 w-5" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Patients"
          />
          <TableFilterButton
            keyParam="status"
            label="Status"
            multiple
            options={[
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
            { value: "name", label: "Name" },
            { value: "date", label: "Date" },
            { value: "status", label: "Status" },
            { value: "type", label: "Type" },
          ]}
        />
      </div>
      <AppointmentRequestTable
        data={requests}
        currentPage={page}
        onChangePage={(val) => setPage(val)}
        totalPages={Math.ceil((appointmentRequestsData?.total ?? 1) / 15)}
      />
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner size={42} />
        </div>
      )}
    </div>
  );
};

export default AppointmentRequestView;
