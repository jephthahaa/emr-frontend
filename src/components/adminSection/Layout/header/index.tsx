"use client";
import { Megaphone02, Notification03Icon } from "@/assets/icons";
import { GreenCheck } from "@/assets/images";
import { Input } from "@/components/FormElements";
import Sheet from "@/components/misc/sheet";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { BsGear } from "react-icons/bs";
import AnnouncementSheet from "../announcementSheet";

const Header = () => {
  return (
    <header className="mt-5 flex h-12 w-full flex-row items-center justify-between px-8">
      <div className="w-[330px]">
        <Input
          icon={<Search className="h-5 w-5" />}
          className="bg-white"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row items-center gap-2.5">
        <Button
          variant="outline"
          className="h-12 w-12 rounded-full p-0 text-gray-500"
        >
          <Notification03Icon />
        </Button>
        <Sheet sheetChild={AnnouncementSheet}>
          <Button
            variant="outline"
            className="h-12 w-12 rounded-full p-0 text-gray-500"
          >
            <Megaphone02 />
          </Button>
        </Sheet>
        <div className="relative h-10 w-[186px] overflow-clip rounded-lg border border-success-300">
          <div className="absolute -bottom-10 right-0 z-[2] h-20 w-10 rotate-[60deg] bg-success-300"></div>
          <div className="absolute left-0 top-0 z-[4] flex h-full w-full flex-row items-center justify-center gap-2 bg-white/80 backdrop-blur-xl">
            <BsGear className="h-4 w-4" />
            <p className="text-sm font-medium">System Operation</p>
            <Image src={GreenCheck} className="h-4 w-4" alt="green check" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
