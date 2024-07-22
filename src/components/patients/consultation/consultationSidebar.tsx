"use client";
import { FileAttachmentIcon, UserLove02Icon } from "@/assets/icons";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ConsultationNotesView from "./consultationSidebarViews/consultationNotesView";
import ConsultationsSummuryView from "./consultationSidebarViews/consultationsSummuryView";

enum Mode {
  Note = "Note",
  Summary = "Summary",
  None = "None",
}

const ConsultationSidebar = () => {
  const [selectedMode, setSelectedMode] = useState(Mode.Summary);
  const [isOpen, setisOpen] = useState(true);

  return (
    <aside className="flex h-[calc(100vh-32px-166px)] flex-row">
      <motion.div
        initial={{ width: "auto" }}
        animate={{
          width: isOpen ? "auto" : 0,
          overflow: "hidden",
        }}
        exit={{ width: 0 }}
        transition={{ duration: 0.2 }}
        className="flex h-full"
      >
        {selectedMode === Mode.None && (
          <div className="flex h-full w-[255px] shrink-0 flex-col gap-6 border-l border-l-gray-200  bg-grayscale-50 p-4" />
        )}
        {selectedMode === Mode.Note && <ConsultationNotesView />}
        {selectedMode === Mode.Summary && <ConsultationsSummuryView />}
      </motion.div>

      <div className="flex h-full w-14 flex-col items-center gap-2 border-l border-l-white bg-grayscale-10  p-2">
        <button
          onClick={() => {
            if (selectedMode === Mode.Note && isOpen) {
              setisOpen(false);
            }

            if (selectedMode === Mode.Note && !isOpen) {
              setisOpen(true);
            }

            if (selectedMode !== Mode.Note) {
              setSelectedMode(Mode.Note);
            }
            if (!isOpen) {
              setSelectedMode(Mode.Note);
              setisOpen(true);
            }
          }}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl duration-100 hover:bg-primaryLight hover:text-primary/80",
            selectedMode === Mode.Note && isOpen
              ? "bg-primaryLight text-primary"
              : "text-black",
          )}
        >
          <UserLove02Icon className="h-6 w-6" />
        </button>
        <button
          onClick={() => {
            if (selectedMode === Mode.Summary && isOpen) {
              setisOpen(false);
            }

            if (selectedMode === Mode.Summary && !isOpen) {
              setisOpen(true);
            }

            if (selectedMode !== Mode.Summary) {
              setSelectedMode(Mode.Summary);
            }

            if (!isOpen) {
              setSelectedMode(Mode.Summary);
              setisOpen(true);
            }
          }}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl duration-100 hover:bg-primaryLight hover:text-primary/80",
            selectedMode === Mode.Summary && isOpen
              ? "bg-primaryLight text-primary"
              : "text-black",
          )}
        >
          <FileAttachmentIcon className="h-6 w-6" />
        </button>
      </div>
    </aside>
  );
};

export default ConsultationSidebar;
