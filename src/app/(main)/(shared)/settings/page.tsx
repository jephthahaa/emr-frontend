import AnnouncementsPopover from "@/components/home/announcementsPopover";
import SettingsSidebar from "@/components/settings/settingsSidebar";
import SettingsViews from "@/components/settings/settingsViews";
import React from "react";

export default function Settings() {
  return (
    <div className="h-[calc(100vh-32px)] w-full overflow-clip rounded-2xl border border-gray-100 bg-gray-50">
      <header className="flex w-full flex-row items-center justify-between border-b border-gray-200 bg-white px-6 pb-4 pt-6">
        <p className="text-2xl font-bold">Settings</p>

        <div className="flex flex-row items-center gap-3">
          <AnnouncementsPopover />
        </div>
      </header>
      <section className="flex flex-row">
        <SettingsSidebar />
        <SettingsViews />
      </section>
    </div>
  );
}
