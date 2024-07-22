"use client";
import { UserSharingIcon } from "@/assets/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { cn, isUrl } from "@/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PatientDetailsTabs = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const openTabs = useAppSelector((state) => state.patients.openTabs);

  useEffect(() => {
    if (id !== "home") {
      const idx = openTabs.findIndex((item) => item.id === id);

      if (idx === -1) {
        router.replace(`/patients/home`);
      }
    }
  }, [id, openTabs, router]);

  return (
    <div className="flex flex-row items-center gap-3">
      <button
        onClick={() => {
          router.replace(`/patients/home`);
        }}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white",
          id === "home" ? "border-gray-400 bg-gray-100" : "border-gray-200",
        )}
      >
        <UserSharingIcon className="h-5 w-5" />
      </button>
      <div className="flex w-[calc(100vw-280px-32px-40px-12px)] flex-row gap-3 overflow-x-scroll scrollbar-none">
        {openTabs.map((tab) => (
          <div
            key={`patient-tab-${tab.id}`}
            className={cn(
              "relative flex h-10 shrink-0 cursor-pointer flex-row items-center rounded-lg  border pl-3 duration-75 hover:bg-primaryLight",
              id === tab.id ? "border-gray-400 bg-gray-100" : "border-gray-200",
            )}
          >
            <div
              onClick={() => {
                router.replace(`/patients/${tab.id}`);
                dispatch(action.patients.setSelectOpenTab(tab.id));
              }}
              className="absolute left-0 top-0 h-full w-[calc(100%-36px)]"
            ></div>
            <div className="mr-1.5 h-5 w-5 rounded-full bg-gray-600">
              <Image
                className="h-full w-full rounded-full"
                src={isUrl(tab.profilePicture)}
                width={20}
                height={20}
                alt="profile"
              />
            </div>
            <p className="text-sm font-medium">{`${tab.firstName} ${tab.lastName}`}</p>
            <button
              onClick={() => {
                if (id === tab.id) {
                  const idx = openTabs.findIndex((item) => item.id === tab.id);
                  if (openTabs.length > 1) {
                    if (idx === 0) {
                      router.replace(`/patients/${openTabs[idx + 1].id}`);
                      dispatch(action.patients.removeOpenTab(tab.id));
                    } else {
                      router.replace(`/patients/${openTabs[idx - 1].id}`);
                      dispatch(action.patients.removeOpenTab(tab.id));
                    }
                  } else {
                    router.replace(`/patients/home`);
                    dispatch(action.patients.removeOpenTab(tab.id));
                  }
                } else {
                  dispatch(action.patients.removeOpenTab(tab.id));
                }
              }}
              className="px-2.5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDetailsTabs;
