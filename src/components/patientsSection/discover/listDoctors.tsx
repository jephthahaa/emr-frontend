"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/FormElements";
import DoctorCard from "@/components/patientsSection/home/doctorCard";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { IDoctor } from "@/types";
import { cn } from "@/utils";
import { useDebounce } from "@/hooks/useDebouce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterDiscoverPopover from "./filterPopover";
import Sheet from "@/components/misc/sheet";
import FilterModal from "@/components/referrals/FilterModal";
import { BsFilter } from "react-icons/bs";
import { Button } from "@/components/ui/button";

type ListDoctorsProps = {
  topDoctors: IDoctor[];
  suggestedDoctors: IDoctor[];
  isSearch?: boolean;
  searchData: IDoctor[];
};

const popularSpecialities = [
  "General Practitioner",
  "Dentist",
  "Brain Specialist",
  "Heart Specialist",
  "Dermatologist",
  "Gynecologist",
  "Psychiatrist",
  "Physicians",
  "Neurologist",
  "Cardiologist",
];

const ListDoctors = ({
  topDoctors,
  suggestedDoctors,
  isSearch,
  searchData,
}: ListDoctorsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const searchText = useDebounce(search, 500);

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    setSelectedSpeciality(searchParams.get("speciality") ?? "");
  }, []);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        speciality: selectedSpeciality,
        search: searchText,
      })}`,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, selectedSpeciality]);

  return (
    <section className="flex w-full flex-col gap-6 p-6 pt-4">
      <div className="flex flex-row items-center gap-1">
        <Input
          className="w-[640px] border-transparent bg-grayscale-100"
          icon={<FiSearch className="h-5 w-5" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for doctors specialty or problem"
        />
        <Sheet sheetChild={({ onClose }) => <FilterModal onClose={onClose} />}>
          <Button
            variant="ghost"
            className="bg-gray-10 flex h-9 flex-row items-center gap-1.5 rounded-md px-3 py-2"
          >
            <BsFilter className="h-5 w-5" />
            <p className="text-sm font-medium">No Filters</p>
            <FiChevronDown />
          </Button>
        </Sheet>
      </div>
      <div className="flex w-full flex-col gap-6">
        <p className="text-xl font-bold leading-5">Categories</p>

        <div className="flex flex-row gap-4 overflow-x-scroll">
          {popularSpecialities.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelectedSpeciality((prev) => (prev === item ? "" : item));
              }}
              className={cn(
                "flex min-w-[164px] flex-row items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 duration-75",
                selectedSpeciality === item && "border-primaryDark",
              )}
            >
              <div className="h-9 w-9 shrink-0 rounded bg-gray-300"></div>
              <div>
                <p className="text-sm">{item}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {!isSearch && (
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-row items-center justify-between">
            <p className="text-xl font-bold leading-5">Top Doctors</p>
          </div>
          <div className="flex flex-row gap-6 overflow-x-scroll">
            {topDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      )}
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold leading-5">
            {isSearch ? "Search" : "Suggested"} Doctors
          </p>
        </div>
        {isSearch ? (
          <>
            <div className="flex flex-row flex-wrap gap-6">
              {searchData.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            {searchData.length === 0 && (
              <div className="flex h-full w-full flex-1 items-center justify-center">
                <p className="text-lg font-medium text-gray-500">
                  No doctors found
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-row flex-wrap gap-6">
            {suggestedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ListDoctors;
