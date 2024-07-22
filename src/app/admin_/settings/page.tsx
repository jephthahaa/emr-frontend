import SettingsViews from "@/components/adminSection/settings/settingsViews";
import SettingsSidebar from "@/components/settings/settingsSidebar";
import React from "react";

export default function Settings() {
  return (
    <div className="h-[calc(100vh-68px-32px-24px)] w-full flex-1 overflow-clip rounded-2xl border border-gray-100 bg-gray-50">
      <header className="flex w-full flex-row items-center justify-between border-b border-gray-200 bg-white px-6 pb-4 pt-6">
        <p className="text-2xl font-bold">Settings</p>
      </header>
      <section className="flex h-[calc(100vh-68px-32px-24px-73px)] flex-1 flex-row">
        <SettingsSidebar />
        <SettingsViews />
      </section>
    </div>
  );
}
