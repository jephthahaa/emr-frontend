"use client";
import { Message01Icon } from "@/assets/icons";
import FaceSmileIcon from "@/assets/icons/FaceSmileIcon";
import {
  IconsultationSidebarItems,
  consultationItems,
  sidebarItems,
} from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { cn } from "@/utils";
import { useParams } from "next/navigation";
import React from "react";

const PatientsDetailsSidebar = () => {
  return (
    <aside className="flex h-[calc(100vh-164px)] w-[215px] shrink-0 flex-col border-r border-gray-200 bg-white px-4 py-6">
      <p className="mb-8 font-bold">Patient’s File</p>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-4 text-sm text-gray-400">CONSULTATION</p>
          {consultationItems.map((item) => (
            <SidebarItem key={item.id} item={item} Icon={Message01Icon} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default PatientsDetailsSidebar;

const SidebarItem = ({
  item = {
    id: "overview",
    title: "Overview",
  },
  Icon = FaceSmileIcon,
}: {
  item: {
    id: IconsultationSidebarItems;
    title: string;
  };
  Icon?: typeof FaceSmileIcon;
}) => {
  const { id } = useParams<{ id: string }>();
  const active =
    useAppSelector((state) => state.patients.viewTabs[id]?.selectedTab) ===
    item.id;
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() =>
        dispatch(action.patients.setSelectedViewTab({ id, tab: item.id }))
      }
      className={cn(
        "flex h-10 flex-row items-center gap-1.5 rounded-lg px-3 text-gray-500 hover:bg-gray-100",
        active && "bg-grayscale-75 text-black",
      )}
    >
      <Icon className="h-5 w-5" />
      <p className="text-sm font-medium">{item.title}</p>
    </button>
  );
};
