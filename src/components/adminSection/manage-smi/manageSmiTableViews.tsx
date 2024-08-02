"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/FormElements";
import { FiSearch } from "react-icons/fi";
import { TableFilterButton } from "@/components/tables/ filterOrSort/tableFilterButton";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import Button from "@/components/misc/button";
import AppointmentTabs from "@/components/appointments/appointmentTabs";
import { Plus } from "lucide-react";
import Dialog from "@/components/misc/dialog";
import useZomujoApi from "@/services/zomujoApi";
import SymptomsTable from "@/components/adminSection/manage-smi/tables/symptomsTable";
import MedicinesTable from "@/components/adminSection/manage-smi/tables/medicinesTable";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebouce";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useSearchParams } from "next/navigation";
import { IMedicine, ISymptom } from "@/types";
import { SYMPTOMS_TYPES } from "@/constants";
import AddSymptomDialog from "@/components/adminSection/manage-smi/dialogs/addSymptomDialog";
import AddMedicineDialog from "@/components/adminSection/manage-smi/dialogs/addMedicineDialog";

const tabs = [
  { count: 0, name: "Symptoms" },
  {
    count: 0,
    name: "Medicines",
  },
  {
    count: 0,
    name: "Icds",
  },
];

const ManageSmiTableViews = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const filterSort = searchParams.get("sort") ?? "";
  const filterType = searchParams.get("type") ?? "";
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const [page, setPage] = useState(1);

  const { symptoms, medicines } = useZomujoApi(false).admin;

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin",
      "smi",
      selectedTab,
      page,
      filterSort,
      filterType,
      searchText,
    ],
    queryFn: async () => {
      const fn = {
        Medicines: medicines.getAllMedicine,
        Symptoms: symptoms.getAllSymptom,
        Icds: symptoms.getAllSymptom,
      }[selectedTab]!;

      return fn({
        page: page,
        limit: 25,
        sort: filterSort,
        search: searchText,
        type: filterType,
      });
    },
  });

  const tableData = data?.data ?? [];

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="w-fit rounded-full bg-grayscale-75 p-0.5">
        <AppointmentTabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          counts={[0, 0]}
          float={false}
        />
      </div>
      <div className="flex w-full flex-col gap-6">
        <p className="text-xl font-bold">{selectedTab}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Input
              className="w-[330px] border-gray-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<FiSearch className="h-5 w-5" />}
              placeholder={`Search ${selectedTab.toLowerCase()}`}
            />
            {selectedTab === "Symptoms" && (
              <TableFilterButton
                keyParam="type"
                label="Type"
                options={SYMPTOMS_TYPES.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <TableSortButton
              orderPos="left"
              options={
                [
                  { value: "name", label: "Name" },
                  selectedTab === "Symptoms" && {
                    value: "type",
                    label: "Type",
                  },
                ].filter(Boolean) as { value: string; label: string }[]
              }
            />
            <Dialog
              disableOutsideClick
              dialogChild={(props) => {
                const Dialog = {
                  Symptoms: AddSymptomDialog,
                  Medicines: AddMedicineDialog,
                  Icds: AddSymptomDialog,
                }[selectedTab]!;

                return <Dialog {...props} />;
              }}
            >
              <Button className="h-9" primaryClassname="pl-2 pr-3">
                <Plus className="mr-2 h-4 w-4" />
                Add {selectedTab.slice(0, selectedTab.length - 1)}
              </Button>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="h-[800px]">
        {
          {
            Symptoms: (
              <SymptomsTable
                data={tableData as ISymptom[]}
                currentPage={page}
                onChangePage={setPage}
                totalPages={Math.ceil((data?.total ?? 1) / 25)}
              />
            ),
            Medicines: (
              <MedicinesTable
                data={tableData as IMedicine[]}
                currentPage={page}
                onChangePage={setPage}
                totalPages={Math.ceil((data?.total ?? 1) / 25)}
              />
            ),
            Icds: <></>,
          }[selectedTab]
        }
        {isLoading && (
          <div className="flex h-[183px] w-full items-center justify-center">
            <LoadingSpinner size={32} />
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageSmiTableViews;
