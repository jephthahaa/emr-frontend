"use client";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DateSelector = ({
  value,
  onIncrement,
  onDecrement,
  className = "",
}: {
  value: string;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <button
        onClick={onDecrement}
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-200"
      >
        <FiChevronLeft className="h-5 w-5 text-gray-500" />
      </button>
      <p className="text-sm">{value}</p>
      <button
        onClick={onIncrement}
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-200"
      >
        <FiChevronRight className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
};

export default DateSelector;
