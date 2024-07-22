"use client";
import { useAppSelector } from "@/hooks";
import React from "react";
import SettingsPersonalView from "./views/settingsPersonalView";
import SettingsSecurityView from "./views/settingsSecurityView";
import SettingsNotificationView from "./views/settingsNotificationView";
import SettingsGlobalsView from "@/components/adminSection/settings/views/settingsGlobalsView";

const SettingsViews = () => {
  const selectedTab = useAppSelector((state) => state.settings.selectedTab);
  return (
    <>
      {
        {
          personal: <SettingsPersonalView />,
          security: <SettingsSecurityView />,
          notification: <SettingsNotificationView />,
          globals: <SettingsGlobalsView />,
        }[selectedTab]
      }
    </>
  );
};

export default SettingsViews;
