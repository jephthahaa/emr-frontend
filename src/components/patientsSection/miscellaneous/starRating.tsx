import { cn } from "@/utils";
import { Star } from "lucide-react";
import React from "react";

const StarRating = ({ rating = 4.5, className = "" }) => {
  return (
    <div
      className={cn(
        "flex h-fit w-fit flex-row items-center gap-1 rounded-full border border-gray-100 px-1.5 py-1 shadow-xs",
        className,
      )}
    >
      <Star size={14} className="fill-warning-300 text-warning-300" />
      <p className="text-xs leading-3">{rating}</p>
    </div>
  );
};

export default StarRating;
