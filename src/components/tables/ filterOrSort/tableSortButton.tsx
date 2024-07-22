"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, Check } from "lucide-react";

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
import { ArrangeByLettersAZIcon } from "@/assets/icons";
import { FiChevronDown } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TableSortButton({
  options = [],
}: {
  options?: { value: string; label: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("sort") ?? ".";
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(currentParam);

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
    if (value === ".") {
      router.push(`${pathname}?${createQueryString({ sort: "" })}`);
    } else {
      router.push(`${pathname}?${createQueryString({ sort: value })}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex flex-row gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-gray-10 flex h-9 w-[110px] flex-row items-center justify-between gap-1.5 rounded-md border border-gray-300 px-3 py-2"
          >
            {filterLabel(value, "Sort By")}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="filter by..." />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandList>
              {options.map((framework) => {
                const [column] = value.split(".");
                return (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(
                        currentValue === column ? "." : `${currentValue}.DESC`,
                      );
                      // setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        column === framework.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        disabled={value === "."}
        onClick={() => {
          if (value === ".") return;
          setValue((prev) => {
            const [column, dir] = prev.split(".");

            if (dir === "ASC") {
              return `${column}.DESC`;
            } else {
              return `${column}.ASC`;
            }
          });
        }}
        variant="outline"
        className="h-9 w-[60px] bg-transparent px-0"
      >
        {value.split(".")[1]}
      </Button>
    </div>
  );
}

function filterLabel(value: string, label: string) {
  const [column, dir] = value.split(".");
  if (value.length === 1) {
    return (
      <>
        <ArrangeByLettersAZIcon className="h-4 w-4" />
        <p className="text-sm font-medium">{label}</p>
        <FiChevronDown />
      </>
    );
  }

  return (
    <>
      <ArrangeByLettersAZIcon className="h-4 w-4" />
      <p className="text-sm font-medium">{column}</p>
      {dir === "ASC" ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ArrowDown className="h-4 w-4" />
      )}
    </>
  );
}
