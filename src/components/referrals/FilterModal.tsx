"use client";
import React, { useEffect, useState } from "react";
import CloseIcon from "@/assets/icons/X-Close";
import StarIcon from "@/assets/icons/Star01Icon";
import MultiSelect from "@/components/FormElements/multiSelect";
import { Input } from "@/components/FormElements";
import { Star, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebouce";
import { DoubleSlider } from "@/components/ui/slider";

const options = {
  specialities: [
    "General Practitioner",
    "Dentist",
    "Brain Specialist",
    "Heart Specialist",
    "Dermatologist",
    "Gynecologist",
    "Psychiatrist",
    "Physicians",
    "Neurologist",
    "Cardiologist",
  ],
  genders: ["Male", "Female"],
  languages: ["English", "Twi"],
  ratings: [1, 2, 3, 4, 5],
};

const DEFAUTL_PRICE_RANGE = [20, 300];

function FilterModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    location: "",
    speciality: "",
    gender: "",
    language: "",
    starRange: [0, 5],
    priceRange: [20, 300],
  });

  const minPrice = useDebounce(filters?.priceRange[0] ?? 20, 500);
  const maxPrice = useDebounce(filters?.priceRange[1] ?? 300, 500);

  const minStar = useDebounce(filters.starRange[0], 500);
  const maxStar = useDebounce(filters.starRange[1], 500);

  function handleFilterChange<T extends typeof filters>(
    name: keyof T,
    value: T[keyof T],
  ) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }

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
    const params = Array.from(searchParams.entries());

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minStar = searchParams.get("minStar");
    const maxStar = searchParams.get("maxStar");

    if (minPrice && maxPrice) {
      handleFilterChange("priceRange", [Number(minPrice), Number(maxPrice)]);
    }
    if (minStar && maxStar) {
      handleFilterChange("starRange", [Number(minStar), Number(maxStar)]);
    }

    for (const [key, value] of params) {
      if (
        key === "location" ||
        key === "gender" ||
        key === "speciality" ||
        key === "language"
      ) {
        handleFilterChange(key, value);
      }
    }
    return () => {};
  }, [searchParams]);

  return (
    <div className="flex h-full flex-col justify-between gap-6 p-7">
      <div className="flex flex-col items-start justify-between gap-2 self-stretch">
        <div className="flex items-start justify-between self-stretch">
          <p className="text-2xl font-bold text-black">Filters</p>
          <div onClick={onClose}>
            <X />
          </div>
        </div>
        <div className="h-[1px] w-[424px] bg-gray-200"></div>
        <div className="flex flex-col items-start gap-[25px] self-stretch">
          <div className="w-full">
            <Input
              label="Location"
              labelClassName={"text-base font-bold text-black"}
              placeholder="Doctor's location (city)"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          <MultiSelect
            label="Speciality"
            labelClassName={"text-base font-bold text-black"}
            options={options.specialities.map((item) => ({
              value: item,
              label: item,
            }))}
            selected={filters.speciality}
            setSelected={(value) => handleFilterChange("speciality", value)}
          />

          <MultiSelect
            label="Doctor Gender"
            labelClassName={"text-base font-bold text-black"}
            options={options.genders.map((item) => ({
              value: item,
              label: item,
            }))}
            selected={filters.gender}
            setSelected={(value) => handleFilterChange("gender", value)}
          />

          <MultiSelect
            label="Languages Spoken"
            labelClassName={"text-base font-bold text-black"}
            options={options.languages.map((item) => ({
              value: item,
              label: item,
            }))}
            selected={filters.language}
            setSelected={(value) => handleFilterChange("language", value)}
          />

          <div className="flex w-64 flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <label className={"text-base font-bold text-black"}>Stars</label>

              <div className="flex flex-row items-center gap-1">
                <div className="flex flex-row items-center">
                  <p className="inline-block text-sm">
                    {filters.starRange[0].toFixed(1)}
                  </p>
                  <Star className="h-3 w-3" />
                </div>
                <p>-</p>
                <div className="flex flex-row items-center">
                  <p className="inline-block text-sm">
                    {filters.starRange[1].toFixed(1)}
                  </p>
                  <Star className="h-3 w-3" />
                </div>
              </div>
            </div>
            <DoubleSlider
              min={0}
              max={5}
              value={filters.starRange}
              step={0.5}
              onValueChange={(value) => handleFilterChange("starRange", value)}
            />
          </div>

          <div className="flex w-64 flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <label className={"text-base font-bold text-black"}>Price</label>

              <div className="flex flex-row gap-2">
                <p className="text-sm font-medium">${filters.priceRange[0]}</p>
                <p className="text-sm font-medium">${filters.priceRange[1]}</p>
              </div>
            </div>
            <DoubleSlider
              min={DEFAUTL_PRICE_RANGE[0]}
              max={DEFAUTL_PRICE_RANGE[1]}
              value={filters.priceRange}
              step={5}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center gap-[16px] self-stretch">
        <button
          type="button"
          onClick={() => {
            const filter = structuredClone(filters);

            // @ts-ignore
            delete filter.priceRange;
            // @ts-ignore
            delete filter.starRange;

            const priceRange =
              minPrice === DEFAUTL_PRICE_RANGE[0] &&
              maxPrice === DEFAUTL_PRICE_RANGE[1]
                ? { minPrice: "", maxPrice: "" }
                : { minPrice, maxPrice };

            const starRange =
              minStar === 0 && maxStar === 5
                ? { minStar: "", maxStar: "" }
                : { minStar, maxStar };

            router.push(
              // @ts-ignore
              `${pathname}?${createQueryString({
                ...filter,
                ...priceRange,
                ...starRange,
              })}`,
            );
            onClose();
          }}
          className="bg-primaryGradient2 h-10 w-full rounded-[8px] border-[1px] border-solid border-[#B3E5D3] text-base font-medium text-white"
        >
          Save
        </button>
        <button
          className="text-base font-medium"
          onClick={() => {
            setFilters({
              location: "",
              speciality: "",
              gender: "",
              language: "",
              starRange: [0, 5],
              priceRange: [20, 300],
            });
          }}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
