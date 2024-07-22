"use client";
import { Home01Icon } from "@/assets/icons";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const MotionChevronUp = motion(ChevronUp);

type SidebarItemProps = {
  label: string;
  Icon: typeof Home01Icon;
  link: string;
  sub?: {
    label: string;
    link: string;
  }[];
};
const SidebarItem = ({ label, Icon, link, sub }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const active = pathname === `/admin_${link}`;

  const Container = sub ? "button" : "div";

  return (
    <div className="relative">
      {sub === undefined && (
        <Link
          className="absolute left-0 top-0 z-10 h-full w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryDark focus-visible:ring-offset-2"
          href={`/admin_${link}`}
        />
      )}
      <Container
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "min-h-11 relative flex w-full flex-row justify-between rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryDark focus-visible:ring-offset-2 ",
          active && "bg-primaryLight",
        )}
      >
        <div className="flex flex-row items-center gap-2">
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
        </div>
        {sub && (
          <MotionChevronUp
            initial={{
              rotate: isOpen ? 0 : 180,
            }}
            animate={{
              rotate: isOpen ? 0 : 180,
            }}
            className="h-[18px] w-[18px] text-gray-500"
          />
        )}
      </Container>
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          overflow: "clip",
        }}
        className="flex flex-row overflow-clip"
      >
        <div
          style={{ height: (sub?.length ?? 0) * 34 }}
          className="relative flex w-12 flex-col items-center justify-center"
        >
          <div className="h-[calc(100%-28px)] w-0.5 bg-gray-300 " />
        </div>
        <div className="flex w-full flex-col">
          {sub?.map((item) => (
            <Link
              href={`/admin_${link}${item.link}`}
              key={item.link}
              className={cn(
                "flex h-[34px] w-full shrink-0 flex-row items-center rounded-lg duration-75",
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium",
                  pathname.includes(`/admin_${link}${item.link}`)
                    ? "text-black"
                    : "text-gray-500",
                )}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarItem;
