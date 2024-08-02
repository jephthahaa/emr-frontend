"use client";
import { ZyptykLogo } from "@/assets/images";
import Image from "next/image";
import React from "react";
import SidebarItem from "./sidebarItem";
import { DASHBOARDMENUTABS, SERVICE_MODE, isServiceMode } from "@/constants";
import { HelpCircleIcon, Settings03Icon } from "@/assets/icons";
import SidebarControls from "./sidebarControls";
import DirectMessagesView from "./directMessagesView";
import { cn } from "@/utils";
import Dialog from "@/components/misc/dialog";
import HelpAndSupportDialog from "@/components/helpsupport/helpAndSupportDialog";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-[264px] shrink-0 flex-col justify-between p-4">
      <div>
        <Image src={ZyptykLogo} className="mb-9 h-11 w-11" alt="Zyptyk logo" />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase text-gray-400">Menu</p>
            <div className="flex flex-col">
              {DASHBOARDMENUTABS[SERVICE_MODE].map((item) => (
                <SidebarItem
                  key={item.label}
                  Icon={item.Icon}
                  label={item.label}
                  link={item.link}
                />
              ))}
            </div>
          </div>
          {isServiceMode("DOCTOR") && <DirectMessagesView />}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase text-gray-400">
              Help & Settings
            </p>
            <div className="flex flex-col">
              <Dialog dialogChild={HelpAndSupportDialog} disableOutsideClick>
                <button
                  className={cn(
                    "relative flex h-11 flex-row gap-2 rounded-lg p-3",
                  )}
                >
                  <HelpCircleIcon
                    className={cn("h-[18px] w-[18px]", "text-gray-500")}
                  />
                  <p className={cn("text-sm font-medium", "text-gray-500")}>
                    Help & Support
                  </p>
                </button>
              </Dialog>

              <SidebarItem
                Icon={Settings03Icon}
                label="Settings"
                link="/settings"
              />
            </div>
          </div>
        </div>
      </div>
      <SidebarControls />
    </aside>
  );
};

export default Sidebar;
