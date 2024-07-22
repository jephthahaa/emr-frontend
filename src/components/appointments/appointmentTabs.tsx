import { cn } from "@/utils";
import React from "react";

type AppointmentTabsProps = {
  tabs: {
    name: string;
    count: number;
  }[];
  counts: number[];
  selectedTab: any;
  setSelectedTab: React.Dispatch<React.SetStateAction<any>>;
  float?: boolean;
};
const AppointmentTabs = ({
  tabs,
  counts,
  selectedTab,
  setSelectedTab,
  float = true,
}: AppointmentTabsProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-row",
        float && "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      )}
    >
      {tabs.map((tab, i) => (
        <button
          type="button"
          key={tab.name}
          onClick={() => setSelectedTab(tab.name)}
          className={cn(
            "flex shrink-0 flex-row items-center justify-center gap-2.5 rounded-full px-4 py-2.5 duration-100",
            selectedTab === tab.name && "bg-white px-6 shadow-sm",
          )}
        >
          <p
            className={cn(
              "text-sm font-medium text-gray-500",
              selectedTab === tab.name && "text-black",
            )}
          >
            {tab.name}
          </p>
          {counts[i] > 0 && (
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-sm",
                selectedTab === tab.name && "bg-warning-75 text-warning-600",
              )}
            >
              <div className="text-xs">{counts[i]}</div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;
