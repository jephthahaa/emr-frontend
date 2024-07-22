"use client";

import * as React from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiChevronDown } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsFilter } from "react-icons/bs";

export function TableFilterButton({
  options = [],
  label = "Filter by",
  keyParam = "filter",
  multiple = false,
}: {
  options?: { value: string; label: string }[];
  label?: string;
  keyParam?: string;
  multiple?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParam = searchParams.get(keyParam) ?? "";
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | string[]>(
    multiple
      ? currentParam.includes(".")
        ? [...currentParam.split(".")]
        : []
      : currentParam,
  );

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  React.useEffect(() => {
    if (Array.isArray(value)) {
      router.push(
        `${pathname}?${createQueryString({ [keyParam]: value.join(".") })}`,
      );
    } else {
      router.push(`${pathname}?${createQueryString({ [keyParam]: value })}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-gray-10 flex h-9 w-[110px] flex-row items-center justify-between gap-1.5 rounded-md border border-gray-300 px-3 py-2"
          >
            {filterLabel(value, label)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="filter by..." />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandList>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    if (Array.isArray(value)) {
                      if (value.includes(currentValue)) {
                        setValue(value.filter((v) => v !== currentValue));
                      } else {
                        setValue([...value, currentValue]);
                      }
                      setOpen(false);
                    } else {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }
                  }}
                >
                  {Array.isArray(value) ? (
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(framework.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  ) : (
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  )}
                  {framework.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <Button
          variant="ghost"
          className="h-9 gap-1.5 px-2"
          onClick={() => {
            if (multiple) {
              setValue([]);
            } else {
              setValue("");
            }
          }}
        >
          Reset
          <X className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}

function filterLabel(value: string | string[], label: string) {
  if (value.length === 0) {
    return (
      <>
        <BsFilter className="h-5 w-5" />
        <p className="text-sm font-medium">{label}</p>
        <FiChevronDown />
      </>
    );
  }

  if (Array.isArray(value)) {
    if (value.length > 1) {
      return <p className="text-sm font-medium">{value.length} selected</p>;
    } else {
      return <p className="text-sm font-medium">{value[0]}</p>;
    }
  } else {
    return (
      <>
        <BsFilter className="h-5 w-5" />
        <p className="text-sm font-medium">{value}</p>
        <FiChevronDown />
      </>
    );
  }
}
