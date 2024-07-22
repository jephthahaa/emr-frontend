import { cn } from "@/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Accordion = ({
  label = "",
  children,
  collapsable = true,
  labelClassName,
  initialOpen = true,
}: {
  label: string;
  labelClassName?: string;
  children: React.ReactNode;
  collapsable?: boolean;
  initialOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          collapsable && setIsOpen((prev) => !prev);
        }}
        className="flex cursor-pointer flex-row items-center justify-between"
      >
        <p className={cn("text-lg font-bold", labelClassName)}>{label}</p>
        {collapsable && (
          <motion.div
            initial={{
              rotate: isOpen ? 180 : 0,
            }}
            animate={{
              rotate: isOpen ? 180 : 0,
            }}
          >
            <ChevronDown className={cn("h-6 w-6")} />
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          overflow: "hidden",
        }}
        className="flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Accordion;

type AccordianItemProps =
  | {
      label: string;
      isChip?: true;
      chipValues?: string[];
    }
  | {
      label: string;
      value: string;
      placeholder?: string;
      isChip?: false;
    };

export const AccordianItem = (props: AccordianItemProps) => {
  return (
    <div className="item flex flex-col gap-2.5">
      <p className="font-medium">{props.label}</p>
      {props.isChip === false && (
        <div
          className={cn(
            "flex bg-grayscale-100",
            "min-h-[70px] rounded-md p-4",
            props.value === ""
              ? "items-center justify-center"
              : "items-start justify-start",
          )}
        >
          {props.value === "" ? (
            <p className="text-sm font-medium">{props.placeholder}</p>
          ) : (
            <p className="text-sm font-medium">{props.value}</p>
          )}
        </div>
      )}
      {props.isChip === true && (
        <div className="flex flex-row gap-1">
          {props.chipValues?.map((value) => (
            <div
              key={value}
              className={cn(
                "flex bg-grayscale-100",
                "h-8 w-fit items-center justify-center rounded-full px-4",
              )}
            >
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
