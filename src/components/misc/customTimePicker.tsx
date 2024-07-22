"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "./timePicker";
import { Clock01Icon } from "@/assets/icons";

type DatePickerProps = {
  date?: Date | string;
  setDate: (date?: Date) => void;
  className?: string;
  disabled?: boolean;
};

export default function CustomTimePicker({
  date,
  setDate,
  className,
  disabled = false,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={"outline"}
          className={cn(
            "justify-between pl-3 pr-2 text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          {date ? format(new Date(date), "HH:mm:ss") : <span>Pick a time</span>}
          <Clock01Icon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="border-border border-t p-3">
          <TimePicker setDate={setDate} date={new Date(date!)} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
