"use client";
import { ZMRLogo } from "@/assets/images";
import Image from "next/image";
import React from "react";
import { ADMIN_MENUTABS, isServiceMode } from "@/constants";
import { Settings03Icon } from "@/assets/icons";
import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import SidebarItem from "./sidebarItem";
import SidebarControls from "@/components/Layouts/sidebar/sidebarControls";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { isUrl } from "@/utils";

const Sidebar = () => {
  const router = useRouter();
  const recentChats = useAppSelector((state) => state.misc.recentChats);
  return (
    <aside className="flex h-screen w-[264px] shrink-0 flex-col justify-between bg-white p-4">
      <div>
        <Image
          src={ZMRLogo}
          className="mb-9 h-11 w-11"
          priority
          alt="Zyptyk logo"
        />
        <div className="flex flex-col gap-8">
          <Button
            variant="outline"
            className="flex h-10 items-center justify-center gap-2.5 text-sm"
          >
            Generate new report <Plus className="h-[18px] w-[18px]" />
          </Button>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase text-gray-400">Menu</p>
            <div className="flex flex-col">
              {ADMIN_MENUTABS.map((item) => (
                <SidebarItem
                  key={item.label}
                  Icon={item.Icon}
                  label={item.label}
                  link={item.link}
                  sub={item.sub}
                />
              ))}
            </div>
          </div>
          {isServiceMode("DOCTOR") && recentChats.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium uppercase text-gray-400">
                Direct Messages
              </p>
              <div className="flex flex-col">
                {recentChats.filter(Boolean).map((user) => (
                  <button
                    key={user?.id ?? "ops"}
                    onClick={() => router.push(`/messages?chat=${user?.id}`)}
                    className="flex h-12 w-full flex-row items-center justify-start gap-2 rounded-md p-3 duration-75 hover:bg-slate-50"
                  >
                    <div className="h-6 w-6 rounded-full bg-gray-600">
                      <Image
                        className="h-full w-full rounded-full"
                        src={isUrl(null)}
                        width={28}
                        height={28}
                        alt="profile"
                      />
                    </div>

                    <p className="text-start text-sm font-medium text-gray-500">
                      {`${user?.firstName} ${user?.lastName}`}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase text-gray-400">OTHER</p>
            <div className="flex flex-col">
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
