"use client";
import { cn } from "@/utils";
import { PinIcon, Star, StarOff, Trash2 } from "lucide-react";
import React, { useState } from "react";

const TempCard = ({
  label,
  tag,
  onDelete,
}: {
  label: string;
  tag?: string;
  onDelete?: () => void;
}) => {
  const [pinned, setPinned] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <div className="flex h-[160px] w-[180px] flex-col justify-between rounded-lg border border-gray-200 bg-gradient-to-b from-[#C5D8FF4E] to-[#C5D8FF99] p-4">
      <div className="flex flex-row items-start justify-between gap-3">
        <p className="text-sm leading-4">{label}</p>
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100"
          >
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </button>
        )}
      </div>
      <div className="flex flex-row items-center justify-between">
        {tag && (
          <div className="flex items-center justify-center rounded-full bg-gray-50 p-1 px-3 text-xs leading-3">
            {tag}
          </div>
        )}
        {!tag && <div className="" />}
        <div className="-mb-1.5 flex flex-row items-center gap-1">
          <button
            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/40"
            onClick={() => setPinned((prev) => !prev)}
          >
            <PinIcon
              className={cn(
                "h-4 w-4 rotate-45 duration-100",
                pinned
                  ? "fill-primaryDark text-primaryDark"
                  : "text-primaryDark",
              )}
            />
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/40"
            onClick={() => setStarred((prev) => !prev)}
          >
            {starred ? (
              <Star
                className={cn(
                  "h-4 w-4 fill-warning-400 text-warning-400 duration-100",
                )}
              />
            ) : (
              <StarOff className={cn("h-4 w-4 text-warning-400")} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TempCard;
