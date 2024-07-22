import { cn } from "@/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

type SelectProps = {
  label?: string;
  labelClassName?: string;
} & React.ComponentPropsWithoutRef<"select">;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, labelClassName, className, children, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className={cn("block text-sm font-medium", labelClassName)}
          >
            {label}
          </label>
        )}
        <div className={cn("relative", label && "mt-1")}>
          <select
            ref={ref}
            {...props}
            className={cn(
              "h-10 w-full appearance-none rounded-md border border-gray-300 px-2 outline-[2px] duration-100 focus:border-primaryDark focus:outline-primaryDark sm:text-sm",
              className,
            )}
          >
            {children}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
