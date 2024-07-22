"use client";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BsFilter } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { DoubleSlider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebouce";
import { Star } from "lucide-react";

const DEFAUTL_PRICE_RANGE = [20, 300];

const FilterDiscoverPopover = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = React.useState([20, 300]);
  const minPrice = useDebounce(priceRange[0], 500);
  const maxPrice = useDebounce(priceRange[1], 500);

  const [starRange, setStarRange] = React.useState([0, 5]);
  const minStar = useDebounce(starRange[0], 500);
  const maxStar = useDebounce(starRange[1], 500);

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

  useEffect(() => {
    if (
      minPrice === DEFAUTL_PRICE_RANGE[0] &&
      maxPrice === DEFAUTL_PRICE_RANGE[1]
    ) {
      router.push(
        `${pathname}?${createQueryString({
          minPrice: "",
          maxPrice: "",
        })}`,
      );
    } else {
      router.push(
        `${pathname}?${createQueryString({
          minPrice: minPrice,
          maxPrice: maxPrice,
        })}`,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (minStar === 0 && maxStar === 5) {
      router.push(
        `${pathname}?${createQueryString({
          minStar: "",
          maxStar: "",
        })}`,
      );
    } else {
      router.push(
        `${pathname}?${createQueryString({
          minStar: minStar,
          maxStar: maxStar,
        })}`,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minStar, maxStar]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="bg-gray-10 flex h-9 flex-row items-center gap-1.5 rounded-md px-3 py-2"
        >
          <BsFilter className="h-5 w-5" />
          <p className="text-sm font-medium">No Filters</p>
          <FiChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="flex w-full flex-col gap-3 p-3">
          <p className="text-lg font-bold leading-[18px]">Discover Filters</p>
          <hr />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between">
              <label className="text-sm">Stars</label>

              <div className="flex flex-row items-center gap-1">
                <div className="flex flex-row items-center">
                  <p className="inline-block text-sm">{starRange[0]}</p>
                  <Star className="h-3 w-3" />
                </div>
                <p>-</p>
                <div className="flex flex-row items-center">
                  <p className="inline-block text-sm">{starRange[1]}</p>
                  <Star className="h-3 w-3" />
                </div>
              </div>
            </div>
            <DoubleSlider
              min={0}
              max={5}
              value={starRange}
              step={0.5}
              onValueChange={(value) => setStarRange(value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between">
              <label className="text-sm">Price</label>

              <div className="flex flex-row gap-2">
                <p className="text-sm font-medium">${priceRange[0]}</p>
                <p className="text-sm font-medium">${priceRange[1]}</p>
              </div>
            </div>
            <DoubleSlider
              min={DEFAUTL_PRICE_RANGE[0]}
              max={DEFAUTL_PRICE_RANGE[1]}
              value={priceRange}
              step={5}
              onValueChange={(value) => setPriceRange(value)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterDiscoverPopover;
