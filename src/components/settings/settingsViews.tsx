"use client";
import { useAppSelector } from "@/hooks";
import React from "react";
import {
  SettingsPersonalView,
  SettingsSecurityView,
  SettingsNotificationView,
  SettingsPaymentView,
  SettingsIdentificationView,
  SettingsPrivacyView,
} from "@/components/settings/Views";
import PatientsDetailsViews from "../patients/patientsDetails/patientsDetailsViews";
import SettingsPatientRecords from "./Views/settingsPatientRecords";

const SettingsViews = () => {
  const selectedTab = useAppSelector((state) => state.settings.selectedTab);
  return (
    <>
      {
        {
          personal: <SettingsPersonalView />,
          security: <SettingsSecurityView />,
          notification: <SettingsNotificationView />,
          payment: <SettingsPaymentView />,
          identification: <SettingsIdentificationView />,
          privacy: <SettingsPrivacyView />,
          "patient-privacy": <SettingsPrivacyView />,
          "patient-records": <SettingsPatientRecords />,
          records: <PatientsDetailsViews />,
        }[selectedTab]
      }
    </>
  );
};

export default SettingsViews;
