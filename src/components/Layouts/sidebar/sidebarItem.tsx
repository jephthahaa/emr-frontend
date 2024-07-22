"use client";
import { Home01Icon } from "@/assets/icons";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SidebarItemProps = {
  label: string;
  Icon: typeof Home01Icon;
  link: string;
};
const SidebarItem = ({ label, Icon, link }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === link;

  return (
    <Link
      href={link}
      className={cn(
        "relative flex h-11 flex-row gap-2 rounded-lg p-3",
        active && "bg-primaryLight",
      )}
    >
      {active && (
        <div className="absolute -left-2 top-1/2 h-8 w-[5px] -translate-x-[100%] -translate-y-1/2 rounded-l-sm rounded-r-lg bg-primary"></div>
      )}
      <Icon
        className={cn(
          "h-[18px] w-[18px]",
          active ? "text-primary" : "text-gray-500",
        )}
      />
      <p
        className={cn(
          "text-sm font-medium",
          active ? "text-black" : "text-gray-500",
        )}
      >
        {label}
      </p>
    </Link>
  );
};

export default SidebarItem;
