"use client";
import { Input } from "@/components/FormElements";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useDebounce } from "@/hooks/useDebouce";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TransactionsTable from "./transactionsTable";
import { useQuery } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useSearchParams } from "next/navigation";
import { TableSortButton } from "@/components/tables/ filterOrSort/tableSortButton";
import { TableFilterButton } from "@/components/tables/ filterOrSort/tableFilterButton";

export const TransactionsTableView = () => {
  const searchParams = useSearchParams();
  const filterSort = searchParams.get("sort") ?? "";
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const { getTransactions } = useZomujoApi(false).admin;

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "transactions", page, searchText, filterSort],
    queryFn: () =>
      getTransactions({
        limit: 15,
        page,
        search: searchText,
        sort: filterSort,
      }),
  });

  const transactions = data?.data ?? [];

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col gap-6">
        <p className="text-xl font-bold">Transactions</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Input
              className="w-[330px] border-gray-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<FiSearch className="h-5 w-5" />}
              placeholder="Search transactions"
            />
            <TableFilterButton
              keyParam="type"
              label="Type"
              options={[
                { value: "payment", label: "Payment" },
                { value: "withdrawal", label: "Withdrawal" },
              ]}
            />
          </div>
          <TableSortButton
            options={[
              { value: "date", label: "Date" },
              { value: "status", label: "Status" },
              { value: "type", label: "Type" },
            ]}
          />
        </div>
      </div>
      <div className="h-[800px]">
        <TransactionsTable
          data={transactions}
          currentPage={page}
          onChangePage={(val) => setPage(val)}
          totalPages={Math.ceil((data?.total ?? 1) / 25)}
        />
      </div>
      {isLoading && (
        <div className="flex h-[183px] w-full items-center justify-center">
          <LoadingSpinner size={32} />
        </div>
      )}
    </div>
  );
};
