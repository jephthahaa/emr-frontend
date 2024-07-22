"use client";
import { Input } from "@/components/FormElements";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useDebounce } from "@/hooks/useDebouce";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TransactionsTable from "../transactions/transactionTable/transactionsTable";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";

export const TransactionsMiniTableView = () => {
  const [search, setSearch] = useState("");
  const searchText = useDebounce(search, 500);

  const { getTransactions } = useZomujoApi(false).admin;

  const { data } = useQuery({
    queryKey: ["admin", "mini-transactions", searchText],
    queryFn: () =>
      getTransactions({
        search: searchText,
        page: 1,
        limit: 10,
      }),
  });

  const transactions = data?.data;

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col gap-6">
        <p className="text-xl font-bold">Transactions</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            <Input
              className="w-[330px] border-gray-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<FiSearch className="h-5 w-5" />}
              placeholder="Search transactions"
            />
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <TransactionsTable data={transactions ?? []} />
      </div>
      {false && (
        <div className="flex h-[183px] w-full items-center justify-center">
          <LoadingSpinner size={32} />
        </div>
      )}
    </div>
  );
};
