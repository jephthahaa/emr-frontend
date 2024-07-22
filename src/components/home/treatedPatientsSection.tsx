"use client";
import React, { useState } from "react";
import { Input } from "../FormElements";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { ArrangeByLettersAZIcon } from "@/assets/icons";
import { PatientTable } from "../PatientTable";
import { useQuery } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useDebounce } from "@/hooks/useDebouce";
import LoadingSpinner from "../misc/loadingSpinner";

const TreatedPatientsSection = () => {
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const { getPatients } = useZomujoApi(false).doctors;

  const { data: patientsData, isLoading } = useQuery({
    queryKey: ["doctors", "treatedPatients", searchText, page],
    queryFn: () =>
      getPatients({
        search: searchText,
      }),
  });

  const patients = patientsData?.data;

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col gap-6">
        <p className="text-xl font-bold">Treated Patients</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            <Input
              className="w-[330px] border-gray-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<FiSearch className="h-5 w-5" />}
              placeholder="Search Patients"
            />
            <div className="bg-gray-10 flex h-9 flex-row items-center gap-1.5 rounded-md px-3 py-2">
              <BsFilter className="h-5 w-5" />
              <p className="text-sm font-medium">No Filters</p>
              <FiChevronDown />
            </div>
          </div>
          <div className="bg-gray-10 flex h-9 flex-row items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2">
            <ArrangeByLettersAZIcon className="h-4 w-4" />
            <p className="text-sm font-medium">Sort By</p>
            <FiChevronDown />
          </div>
        </div>
      </div>
      <PatientTable
        data={patients}
        filterData={(v) => {
          console.log(v);
        }}
        currentFilter={{ direction: "asc", orderBy: "patientName" }}
      />
      {isLoading && (
        <div className="flex h-[183px] w-full items-center justify-center">
          <LoadingSpinner size={32} />
        </div>
      )}
    </div>
  );
};

export default TreatedPatientsSection;
