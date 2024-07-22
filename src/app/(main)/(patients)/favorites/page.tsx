import React from "react";
import getZomujoApi from "@/services/zomujoApi";
import AnnouncementsPopover from "@/components/home/announcementsPopover";
import FavoritesView from "@/components/patientsSection/favorites/favoritesview";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function FavoriteDoctors({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { getFavouriteDoctors } = getZomujoApi(true).patients;

  const favoriteDoctors =
    (
      await getFavouriteDoctors({
        page: Number(searchParams.page ?? 1),
        limit: 15,
        search: searchParams.search ?? "",
        speciality: searchParams.speciality ?? "",
        maxPrice: Number(searchParams.maxPrice ?? 300),
        minPrice: Number(searchParams.minPrice ?? 20),
        maxStar: Number(searchParams.maxStar ?? 5),
        minStar: Number(searchParams.minStar ?? 0),
        sort: searchParams.sort ?? "",
      })
    ).data ?? [];

  return (
    <div className="h-[calc(100vh-32px)] w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="relative flex w-full flex-row items-center justify-between p-6 pb-4">
        <p className="text-3xl font-bold">Favorite Doctors</p>

        <div className="flex flex-row items-center gap-3">
          <AnnouncementsPopover />
        </div>
      </header>
      <FavoritesView favoriteDoctors={favoriteDoctors} />
    </div>
  );
}
