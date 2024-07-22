import AnnouncementsPopover from "@/components/home/announcementsPopover";
import ListDoctors from "@/components/patientsSection/discover/listDoctors";
import getZomujoApi from "@/services/zomujoApi";
import { IDoctor } from "@/types";
import React from "react";
import { FiSearch } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function DiscoverDoctors({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { getTopDoctors, getFindDoctor } = getZomujoApi(true).patients;

  const hasSearchParams = Object.keys(searchParams).length !== 0;

  let topDoctorsBase: IDoctor[] = [];
  // const suggestedDoctorsBase = (await getSu({ limit: 25 })).data;

  let searchData: IDoctor[] = [];

  if (hasSearchParams) {
    searchData = (
      await getFindDoctor({
        page: Number(searchParams.page ?? 1),
        limit: 15,
        search: searchParams.search ?? "",
        speciality: searchParams.speciality ?? "",
        maxPrice: Number(searchParams.maxPrice ?? 300),
        minPrice: Number(searchParams.minPrice ?? 20),
        maxStar: Number(searchParams.maxStar ?? 5),
        minStar: Number(searchParams.minStar ?? 0),
        location: searchParams.location ?? "",
        gender: searchParams.gender ?? "",
        language: searchParams.language ?? "",
      })
    ).data;
  } else {
    topDoctorsBase = (await getTopDoctors({ limit: 25 })).data;
  }

  const topDoctors = (topDoctorsBase ?? []).slice(0, 2);
  const suggestedDoctors = topDoctorsBase ?? [];
  return (
    <div className="h-[calc(100vh-32px)] w-full overflow-y-scroll rounded-2xl border border-gray-100 bg-gray-50">
      <header className="relative flex w-full flex-row items-center justify-between p-6 pb-4">
        <p className="text-3xl font-bold">Discover Doctors</p>

        <div className="flex flex-row items-center gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 bg-white p-3">
            <FiSearch className="h-5 w-5" />
          </button>
          <AnnouncementsPopover />
        </div>
      </header>
      {hasSearchParams ? (
        <ListDoctors
          topDoctors={[]}
          suggestedDoctors={[]}
          isSearch={true}
          searchData={searchData}
        />
      ) : (
        <ListDoctors
          topDoctors={topDoctors}
          suggestedDoctors={suggestedDoctors}
          searchData={[]}
        />
      )}
    </div>
  );
}
