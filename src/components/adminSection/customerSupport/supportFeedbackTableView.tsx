"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/FormElements";
import { FiSearch } from "react-icons/fi";
import { TableFilterButton } from "@/components/tables/ filterOrSort/tableFilterButton";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import IssuesTable from "@/components/adminSection/customerSupport/issuesTable";
import Button from "@/components/misc/button";
import { FileAttachmentIcon } from "@/assets/icons";
import AppointmentTabs from "@/components/appointments/appointmentTabs";
import FeedbackList from "@/components/adminSection/customerSupport/feedback/feedbackList";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebouce";
import { IFeedback, IIssue } from "@/types";

const tabs = [
  { count: 0, name: "Issues" },
  {
    count: 0,
    name: "Feedback",
  },
];

const feedbackTypes = [
  {
    value: "bug",
    label: "A bug",
  },
  {
    value: "feature",
    label: "A feature request",
  },
  {
    value: "ux-issue",
    label: "User experience issue",
  },
  {
    value: "improvement",
    label: "An improvement",
  },
  {
    value: "other",
    label: "Other",
  },
];

const SupportFeedbackTableView = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const filterSort = searchParams.get("sort") ?? "";
  const filterType = searchParams.get("type") ?? "";
  const filterUserType = searchParams.get("userType") ?? "";
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const [page, setPage] = useState(1);

  const { getAllFeedback, getAllIssues } =
    useZomujoApi(false).admin.helpSupport;

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin",
      "help",
      selectedTab,
      page,
      filterSort,
      filterType,
      filterUserType,
      searchText,
    ],
    queryFn: async () => {
      const fn = {
        Issues: getAllIssues,
        Feedback: getAllFeedback,
      }[selectedTab]!;

      return fn({
        page: page,
        limit: 25,
        sort: filterSort,
        search: searchText,
        type: filterType,
        userType: filterUserType,
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
              placeholder="Search ticket"
            />
            <TableFilterButton
              keyParam="userType"
              label="UserType"
              options={[
                { value: "patient", label: "Patient" },
                { value: "doctor", label: "Doctor" },
              ]}
              className="w-[120px]"
            />
            {selectedTab !== "Issues" && (
              <TableFilterButton
                keyParam="type"
                label="Type"
                options={feedbackTypes}
                multiple
              />
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <TableSortButton
              orderPos="left"
              options={
                [
                  { value: "createdAt", label: "Date" },
                  { value: "userType", label: "UserType" },
                  selectedTab !== "Issues" && { value: "type", label: "Type" },
                  selectedTab === "Issues" && { value: "name", label: "Issue" },
                ].filter(Boolean) as { value: string; label: string }[]
              }
            />
            <Button className="h-9 min-w-[98px]">
              <FileAttachmentIcon className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[800px]">
        {
          {
            Issues: (
              <IssuesTable
                data={tableData as IIssue[]}
                currentPage={page}
                onChangePage={setPage}
                totalPages={Math.ceil((data?.total ?? 1) / 20)}
              />
            ),
            Feedback: (
              <FeedbackList
                data={tableData as IFeedback[]}
                currentPage={page}
                onChangePage={setPage}
                totalPages={Math.ceil((data?.total ?? 1) / 20)}
              />
            ),
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
export default SupportFeedbackTableView;
