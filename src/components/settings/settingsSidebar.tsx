"use client";
import { File01Icon } from "@/assets/icons";
import FaceSmileIcon from "@/assets/icons/FaceSmileIcon";
import { SERVICE_MODE, SETTINGSMENUTABS, isServiceMode } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { cn } from "@/utils";
import React from "react";
import { LucideIcon } from "lucide-react";

const SettingsSidebar = () => {
  return (
    <aside
      className={cn(
        "flex h-[calc(100vh-119px)] w-[240px] shrink-0 flex-col border-r border-gray-200 bg-white px-4 py-6",
        isServiceMode("ADMIN") && "h-full",
      )}
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <p className="mb-4 text-sm text-gray-400">ACCOUNT</p>
          {SETTINGSMENUTABS[SERVICE_MODE].map((item) => (
            <SidebarItem key={item.id} item={item} Icon={item.Icon} />
          ))}
        </div>
        {isServiceMode("PATIENT") && (
          <div className="flex flex-col gap-2">
            <p className="mb-4 text-sm text-gray-400">OTHER</p>
            <>
              <SidebarItem
                item={{
                  id: "patient-records",
                  title: "Records",
                }}
                Icon={File01Icon}
              />
              <SidebarItem
                item={{
                  id: "patient-privacy",
                  title: "Privacy",
                }}
                Icon={File01Icon}
              />
            </>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SettingsSidebar;

const SidebarItem = ({
  item = {
    id: "overview",
    title: "Overview",
  },
  Icon = FaceSmileIcon,
}: {
  item: {
    id: string;
    title: string;
  };
  Icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
}) => {
  const active =
    useAppSelector((state) => state.settings.selectedTab) === item.id;
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(action.settings.setSelectedTab(item.id))}
      className={cn(
        "flex h-10 flex-row items-center gap-1.5 rounded-lg px-3 text-gray-500 duration-100 hover:bg-gray-100",
        active && "bg-primaryLight text-black",
      )}
    >
      <Icon className={cn("h-5 w-5 duration-100", active && "text-primary")} />
      <p className="text-sm font-medium duration-100">{item.title}</p>
    </button>
  );
};
