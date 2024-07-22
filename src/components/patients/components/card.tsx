"use client";
import { cn } from "@/utils";
import { PinIcon, Star, StarOff } from "lucide-react";
import React, { useState } from "react";

const Card = ({ label, tag }: { label: string; tag?: string }) => {
  const [pinned, setPinned] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <div className="flex h-[160px] w-[180px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm leading-3">{label}</p>
      <div className="flex flex-row items-center justify-between">
        {tag && (
          <div className="flex items-center justify-center rounded-full bg-gray-100 p-1 px-3 text-xs leading-3">
            {tag}
          </div>
        )}
        {!tag && <div className="" />}
        <div className="-mb-1.5 flex flex-row items-center gap-1">
          <button
            className="h-6 w-6 rounded-md"
            onClick={() => setPinned((prev) => !prev)}
          >
            <PinIcon
              className={cn(
                "h-4 w-4 rotate-45 duration-100",
                pinned ? "fill-primaryDark text-primaryDark" : "text-gray-300",
              )}
            />
          </button>
          <button
            className="h-6 w-6 rounded-md"
            onClick={() => setStarred((prev) => !prev)}
          >
            {starred ? (
              <Star
                className={cn(
                  "h-4 w-4 fill-warning-400 text-warning-400 duration-100",
                )}
              />
            ) : (
              <StarOff className={cn("h-4 w-4 text-gray-300")} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
