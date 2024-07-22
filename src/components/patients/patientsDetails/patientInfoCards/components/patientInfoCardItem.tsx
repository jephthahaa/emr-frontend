"use client";
import { ISurgery } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

const PatientInfoCardItem = ({ surgery }: { surgery: ISurgery }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex cursor-pointer flex-col rounded-xl bg-gradient-to-b from-[#FFD0B0] to-[#FFDBC382] p-4"
    >
      <div className="flex flex-row items-center gap-1 text-[#7A3200]">
        <p className="font-bold">{surgery.name}</p>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          overflow: "hidden",
          paddingTop: isOpen ? 16 : 0,
        }}
        className="flex flex-col gap-2.5 overflow-clip text-sm text-[#7A3200]"
      >
        <p className="">Notes</p>
        <p>{surgery.additionalNotes}</p>
      </motion.div>
    </div>
  );
};

export default PatientInfoCardItem;
