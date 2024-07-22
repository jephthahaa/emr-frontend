"use client";
import React, { useState } from "react";
import { Input } from "@/components/FormElements";
import { FiSearch } from "react-icons/fi";
import Sheet from "@/components/misc/sheet";
import { BsFilter } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import FilterModal from "./FilterModal";

function ReferralSearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex shrink-0 flex-row items-center gap-[25px]">
      <Input
        className="w-full border-gray-200 bg-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon={<FiSearch className="h-5 w-5" />}
        placeholder="Search for doctor speciality or problem"
      />

      <Sheet sheetChild={({ onClose }) => <FilterModal onClose={onClose} />}>
        <button className="flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-md border-[1px] border-solid border-gray-300 px-2 py-2">
          <BsFilter /> No filters <FiChevronDown />
        </button>
      </Sheet>
    </div>
  );
}

export default ReferralSearch;
