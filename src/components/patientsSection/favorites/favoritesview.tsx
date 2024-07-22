"use client";
import React, { useEffect, useState } from "react";
import FilterDiscoverPopover from "../discover/filterPopover";
import { Input } from "@/components/FormElements";
import { FiSearch } from "react-icons/fi";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import { IDoctor } from "@/types";
import DoctorCard from "../home/doctorCard";
import { useDebounce } from "@/hooks/useDebouce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FavoritesView = ({ favoriteDoctors }: { favoriteDoctors: IDoctor[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
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
    router.push(
      `${pathname}?${createQueryString({
        search: searchText,
      })}`,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <section className="flex w-full flex-col gap-6 p-6 pt-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-1">
          <Input
            className="w-[640px] border-transparent bg-grayscale-100"
            icon={<FiSearch className="h-5 w-5" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for doctors specialty or problem"
          />
          <FilterDiscoverPopover />
        </div>
        <TableSortButton
          options={[
            { label: "Name", value: "name" },
            { label: "Rating", value: "rating" },
            { label: "Price", value: "price" },
            { label: "Experience", value: "experience" },
            { label: "Consultations", value: "consultation" },
          ]}
        />
      </div>

      <div className="flex h-[calc(100vh-224px)] w-[calc(100vw-332px)] flex-row flex-wrap gap-6 overflow-y-scroll">
        {favoriteDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
        {favoriteDoctors.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <p className="text-2xl font-bold text-gray-400">No Doctors Found</p>
            <p className="text-sm font-medium text-gray-400">
              No doctors found in your favorite list
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesView;
