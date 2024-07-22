import { cn } from "@/utils";
import { Info, Plus } from "lucide-react";
import React from "react";

type MultiSelectProps = {
  options: {
    label: string;
    value: string;
  }[];
  selected: string;
  setSelected: (value: string) => void;
  tooltip?: string;
  label?: string;
  labelClassName?: string;
  onAdd?: () => void;
  containerClassName?: string;
};

const MultiSelect = ({
  tooltip,
  label,
  labelClassName,
  options,
  selected,
  setSelected,
  onAdd,
  containerClassName,
}: MultiSelectProps) => {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {(tooltip || label) && (
        <div className="flex flex-row items-center gap-1">
          {label && (
            <p className={cn("font-medium leading-4", labelClassName)}>
              {label}
            </p>
          )}
          {tooltip && <Info size={14} />}
        </div>
      )}
      <div className="flex flex-row flex-wrap gap-3">
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "flex w-fit cursor-pointer flex-row items-center gap-1.5 rounded-full px-3 py-1.5 duration-100",
              selected === option.value
                ? "bg-primaryLightBase text-white"
                : "bg-gray-100 text-black hover:bg-gray-200",
            )}
            onClick={() =>
              selected === option.value
                ? setSelected("")
                : setSelected(option.value)
            }
          >
            <p className="select-none text-sm leading-[14px]">{option.label}</p>
          </div>
        ))}

        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="flex w-fit flex-row items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-black duration-100"
          >
            <Plus size={14} />
            <p className="text-sm leading-[14px]">Add</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
