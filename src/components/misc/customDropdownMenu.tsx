import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";

type CustomDropdownMenuProps = {
  children: React.ReactNode;
  options: {
    label: string;
    Icon?: (props: JSX.IntrinsicElements["svg"]) => React.JSX.Element;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
  }[];
};
const CustomDropdownMenu = ({ children, options }: CustomDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={() => {
              item.onClick!();
            }}
            disabled={item.disabled}
            className={cn("flex items-center gap-2", item.className)}
          >
            {item.Icon && <item.Icon className="h-5 w-5" />}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdownMenu;
