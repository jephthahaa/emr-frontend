"use client";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebouce";
import useZomujoApi from "@/services/zomujoApi";
import { createQueryString, isUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Search, Star, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SearchDoctorsCard = () => {
  const router = useRouter();
  const { getFindDoctor } = useZomujoApi(false).patients;
  const [search, setSearch] = React.useState("");
  const searchText = useDebounce(search, 500);

  const { data: searchData, isLoading } = useQuery({
    enabled: searchText.length > 0,
    queryKey: ["patients", "findDoctor", searchText],
    queryFn: () => getFindDoctor({ search: searchText, limit: 6, page: 1 }),
  });

  return (
    <div className="relative flex w-full flex-col gap-8 rounded-2xl bg-primary p-8">
      <div className="flex flex-col gap-3 text-white">
        <p className="text-2xl font-bold leading-6">
          Find the right doctor for you, faster
        </p>
        <p className="leading-4">
          Search for qualified doctors and book an appointment online.
        </p>
      </div>
      <Popover>
        <div className="flex h-12 w-full flex-row items-center rounded-xl bg-white p-1.5">
          <Search className="ml-1.5" />
          <input
            type="text"
            placeholder="Search by specialty eg Dentist"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-full flex-1 pl-2 outline-none"
          />
          <PopoverTrigger asChild>
            <button className="h-9 w-fit rounded-md bg-black px-6 text-white outline-none duration-75 hover:bg-gray-900">
              Find Doctor
            </button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          align="end"
          alignOffset={-6}
          className="ml-3 mt-4 w-[686px] p-0"
        >
          <div className="flex min-h-[300px] w-full flex-col gap-3 p-3">
            <div className="flex flex-row items-center justify-between">
              <p className="text-lg font-bold leading-4">Search Results</p>
              <button
                onClick={() => setSearch("")}
                className="flex h-fit flex-row items-center gap-1 p-0 py-0"
              >
                <X className="h-4 w-4" /> clear
              </button>
            </div>
            <hr />
            <div className="flex h-[322px] flex-col gap-2 overflow-y-scroll">
              {isLoading && (
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingSpinner />
                </div>
              )}
              {searchData &&
                searchData?.data.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex w-full flex-row items-end justify-between gap-3 rounded-xl border border-gray-300 bg-white p-2"
                  >
                    <div className="flex flex-col">
                      <div className="mb-4 flex flex-row gap-3 ">
                        <div className="h-11 w-11 rounded-full bg-gray-400">
                          <Image
                            className="h-full w-full rounded-full"
                            src={isUrl(doctor.profilePicture)}
                            width={44}
                            height={44}
                            alt="profile"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className=" font-bold">
                            Dr. {`${doctor?.firstName} ${doctor?.lastName}`}
                          </p>
                          <p className="text-sm font-medium leading-[14px] text-gray-400">
                            {doctor?.specializations
                              ? doctor.specializations[0]
                              : "General Practitioner"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6">
                        <div className="flex h-fit w-fit flex-row items-center gap-1 rounded-full border border-gray-100 px-1.5 py-1 shadow-xs">
                          <Star
                            size={14}
                            className="fill-warning-300 text-warning-300"
                          />
                          <p className="text-xs leading-3">{doctor.ratings}</p>
                        </div>
                        <div className="flex flex-row gap-3">
                          <div className="flex flex-row items-center gap-1.5">
                            <div className="h-[5px] w-[5px] rounded-full bg-primary"></div>
                            <p className="text-sm leading-[14px]">
                              {doctor?.experience ?? 1} years of experience
                            </p>
                          </div>
                          <div className="flex flex-row items-center gap-1.5">
                            <div className="h-[5px] w-[5px] rounded-full bg-primary"></div>
                            <p className="text-sm leading-[14px]">
                              {doctor.noOfConsultations} consultations
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-[86px] flex-col items-end justify-between">
                      <p className="text-2xl font-bold leading-5 text-primaryDark">
                        GHs {doctor?.rate?.amount}
                      </p>

                      <button
                        onClick={() => router.push(`/doctors/${doctor.id}`)}
                        className="h-10 w-[175px] rounded-md border border-gray-300 bg-white text-sm text-black duration-100 hover:bg-gray-50"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => {
                router.push(
                  `/discover?${createQueryString({
                    search: searchText,
                  })}`,
                );
              }}
              className="flex items-center justify-center"
            >
              <p className="text-sm text-gray-500">View More</p>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchDoctorsCard;
