"use client";
import { Checkbox, Input } from "@/components/FormElements";
import AppointmentTabs from "@/components/appointments/appointmentTabs";
import Button from "@/components/misc/button";
import { cn } from "@/utils";
import { Plus, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  AllLabTests,
  LabCategories,
  LabsData,
  findLabTest,
  getSections,
} from "./constants";
import { useDebounce } from "@/hooks/useDebouce";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useAppSelector } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";

const tabs: {
  name: string;
  count: number;
}[] = LabCategories.map((category) => ({
  name: category,
  count: 0,
}));

const RequestLabSheet = ({ onClose }: { onClose: () => void }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const sections = getSections(selectedTab as keyof typeof LabsData);
  const [selectedSection, setSelectedSection] = useState(sections[0].label);
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);

  const results = AllLabTests.filter((test) =>
    test.toLowerCase().includes(searchText.toLowerCase()),
  );

  const id = useParams().id;
  const queryClient = useQueryClient();
  const { postLabs } = useZomujoApi(false).doctors.records;
  const consultationId = useAppSelector(
    (state) => state.consultation.activeConsultationDetails?.id,
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["consultation", "request", "labs", consultationId],
    mutationFn: postLabs,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["consultation", "labs", id],
      });
      toast.success("labs requested");
      onClose();
    },
    onError: (error) => {
      toast.error("An error occured");
    },
  });

  useEffect(() => {
    setSelectedSection(sections[0].label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return (
    <div className="flex h-full flex-col justify-between p-7">
      <div className="">
        <p className="text-2xl font-bold leading-6">Select lab type</p>
        <hr className="my-6" />
        <div className="relative w-full">
          <Input
            icon={<Search size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search labs"
          />

          {searchText.length >= 1 && (
            <div className="absolute right-0 top-12 z-50 flex h-[300px] w-full flex-col gap-3 rounded-xl border bg-white p-3">
              <p className="text-xs">Search results</p>
              <div className="flex h-[calc(100%-16px)] flex-col gap-3 overflow-scroll">
                {results.map((lab) => (
                  <button
                    key={lab}
                    onClick={() => {
                      const result = findLabTest(lab);
                      if (result) {
                        setSelectedTab(result.category);
                        setSelectedSection(result.subcategory);
                        setSelectedLabs((prev) =>
                          prev.includes(lab)
                            ? prev.filter((l) => l !== lab)
                            : [...prev, lab],
                        );
                        setSearch("");
                      }
                    }}
                    className="flex h-6 w-fit shrink-0 flex-row items-center gap-2 rounded-full bg-grayscale-75 px-3 hover:bg-grayscale-100"
                  >
                    <p className="text-xs text-gray-500">{lab}</p>
                    <button>
                      <Plus size={16} />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 pt-4">
          {/* <RecentSearches /> */}
          <hr />
          <div className="w-full overflow-scroll rounded-full border border-gray-100 bg-gray-100 scrollbar-none">
            <AppointmentTabs
              counts={[0, 0, 0]}
              tabs={tabs}
              float={false}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <div className="flex flex-col gap-7 rounded-2xl bg-grayscale-75 p-4">
            <div className="flex flex-row items-center gap-2 overflow-scroll scrollbar-none">
              {sections.map((section) => (
                <button
                  key={section.label}
                  onClick={() => setSelectedSection(section.label)}
                  className={cn(
                    "shrink-0 border-b-2 border-transparent px-1.5 pb-0.5 duration-75",
                    section.label === selectedSection && "border-primary",
                  )}
                >
                  <p>{section.label}</p>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {sections
                .find((section) => section.label === selectedSection)
                ?.options.map((option) => (
                  <div key={option} className="flex ">
                    <Checkbox
                      checked={selectedLabs.includes(option)}
                      onChange={() =>
                        setSelectedLabs((prev) =>
                          prev.includes(option)
                            ? prev.filter((lab) => lab !== option)
                            : [...prev, option],
                        )
                      }
                      labelClassName="text-sm"
                      labelText={option}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs">Select Labs to request :</p>
          <div className="flex flex-row flex-wrap gap-3">
            {selectedLabs.map((lab) => (
              <div
                key={lab}
                className="flex h-6 flex-row items-center gap-2 rounded-full bg-grayscale-75 px-3 hover:bg-grayscale-100"
              >
                <p className="text-xs text-gray-500">{lab}</p>
                <button
                  onClick={() => {
                    setSelectedLabs((prev) => prev.filter((l) => l !== lab));
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <Button
          isLoading={isPending}
          onClick={() => {
            mutate({
              labs: selectedLabs,
              notes: "",
              consultationId: consultationId!,
            });
          }}
          className="w-full"
        >
          Request Lab
        </Button>
      </div>
    </div>
  );
};

const RecentSearches = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs">Recent searches of Labs</p>
      <div className="flex flex-row gap-3">
        <div className="flex h-6 flex-row items-center gap-2 rounded-full bg-grayscale-75 px-3 hover:bg-grayscale-100">
          <p className="text-xs text-gray-500">Ferritin</p>
          <button>
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestLabSheet;
