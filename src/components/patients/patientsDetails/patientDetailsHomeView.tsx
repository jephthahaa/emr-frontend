import { ArrangeByLettersAZIcon } from "@/assets/icons";
import { Input } from "@/components/FormElements";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useAppDispatch } from "@/hooks";
import { useDebounce } from "@/hooks/useDebouce";
import { action } from "@/redux";
import useZomujoApi from "@/services/zomujoApi";
import { cn, isUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const PatientDetailsHomeView = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const { getPatients } = useZomujoApi(false).doctors;

  const { data: patientsData, isLoading } = useQuery({
    queryKey: ["doctors", "treatedPatients", searchText, page],
    queryFn: () =>
      getPatients({
        limit: 25,
        page: page,
        // search: searchText,
      }),
  });

  const patients = patientsData?.data;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between p-6">
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

        <div className="flex flex-row gap-2">
          <div className="bg-gray-10 flex h-9 shrink-0 flex-row items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2">
            <ArrangeByLettersAZIcon className="h-4 w-4" />
            <p className="text-sm font-medium">Sort By</p>
            <FiChevronDown />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-1 flex-row flex-wrap gap-4 px-6",
          isLoading && "h-full items-center justify-center",
        )}
      >
        {isLoading && <LoadingSpinner size={48} stroke={4} />}
        {patients &&
          patients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => {
                dispatch(
                  action.patients.addOpenTab({
                    id: patient.id,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    profilePicture: patient.profilePicture ?? "",
                  }),
                );
              }}
              className={cn(
                "relative flex h-[200px] w-fit min-w-[200px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border bg-white duration-75 hover:bg-primaryLight",
                false ? "border-gray-400 bg-gray-100" : "border-gray-200",
              )}
            >
              <div className="h-[100px] w-[100px] rounded-full bg-gray-600">
                <Image
                  className="h-full w-full rounded-full"
                  src={isUrl(patient.profilePicture)}
                  width={100}
                  height={100}
                  alt="profile"
                />
              </div>
              <span className="block w-fit overflow-hidden overflow-ellipsis whitespace-nowrap">
                {patient.firstName} {patient.lastName}{" "}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientDetailsHomeView;
