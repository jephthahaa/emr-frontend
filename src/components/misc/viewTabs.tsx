"use client";
import { cn } from "@/utils";
import React from "react";

type ViewTabsProps<T> = {
  value: T;
  options: {
    value: T;
    label: string;
  }[];
  onChange: (value: T) => void;
};

const ViewTabs: <T extends string | number>(
  props: ViewTabsProps<T>,
) => JSX.Element = ({ options, onChange, value }) => {
  return (
    <div className="flex flex-row items-center gap-1 rounded-lg bg-grayscale-75 p-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          className={cn(
            "flex h-8 items-center justify-center rounded-md px-3 duration-100",
            value === option.value ? "bg-white shadow-lg" : "bg-grayscale-75",
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ViewTabs;
