"use client";
import { Input } from "@/components/FormElements";
import { PatientTable } from "@/components/PatientTable";
import AnnouncementsPopover from "@/components/home/announcementsPopover";
import Button from "@/components/misc/button";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { TableFilterButton } from "@/components/tables/ filterOrSort/tableFilterButton";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import { useDebounce } from "@/hooks/useDebouce";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function Page() {
  const searchParams = useSearchParams();
  const filterGender = searchParams.get("gender") ?? "";
  const filterSort = searchParams.get("sort") ?? "";
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const { getPatients } = useZomujoApi(false).doctors;

  const { data: patientsData, isLoading } = useQuery({
    queryKey: [
      "doctors",
      "treatedPatients",
      searchText,
      page,
      filterGender,
      filterSort,
    ],
    queryFn: () =>
      getPatients({
        limit: 15,
        page: page < 1 ? 1 : page,
        search: searchText,
        sort: filterSort,
        gender: filterGender,
      }),
  });

  const patients = patientsData?.data;

  useEffect(() => {
    const totalPages = Math.ceil((patientsData?.total ?? 1) / 15);
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [patientsData?.total, page]);

  return (
    <div className="h-[calc(100vh-32px)] w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="flex w-full flex-row items-center justify-between border-b border-gray-200 px-6 pb-4 pt-6">
        <p className="text-2xl font-bold">All Patients</p>

        <div className="flex flex-row items-center gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 bg-white p-3">
            <FiSearch className="h-5 w-5" />
          </button>
          <AnnouncementsPopover />
        </div>
      </header>
      <div className="flex flex-row items-center justify-between p-6">
        <div className="flex flex-row gap-2">
          <Input
            className="w-[330px] border-gray-200 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<FiSearch className="h-5 w-5" />}
            placeholder="Search Patients"
          />
          <TableFilterButton
            keyParam="gender"
            label="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
        </div>

        <div className="flex flex-row items-center gap-2">
          <TableSortButton
            options={[
              { value: "name", label: "Name" },
              { value: "date", label: "Recent Consult" },
              { value: "gender", label: "Gender" },
            ]}
          />
          <Link href="/patients/home">
            <Button
              variant="primary"
              className="h-9 text-sm"
              primaryClassname="px-6 gap-1"
            >
              Patients
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex h-[calc(100vh-230px)] flex-col overflow-scroll px-6">
        <PatientTable
          data={patients}
          filterData={() => {}}
          currentFilter={{ direction: "asc", orderBy: "id" }}
          currentPage={page}
          onChangePage={(val) => setPage(val)}
          totalPages={Math.ceil((patientsData?.total ?? 1) / 15)}
        />
        {isLoading && (
          <div className="flex flex-1 items-center justify-center">
            <LoadingSpinner size={72} stroke={4} />
          </div>
        )}
      </div>
    </div>
  );
}
