import CashFlowCard from "@/components/adminSection/transactions/cashFlowCard";
import RecentTransactions from "@/components/adminSection/transactions/recentTransactions";
import { TransactionsTableView } from "@/components/adminSection/transactions/transactionTable/transactionsTableView";
import React from "react";

export default function Transactions() {
  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="">
        <p className="text-[38px] font-bold leading-[38px]">Transactions</p>
      </div>
      <div className="flex w-full flex-row gap-7">
        <CashFlowCard />
        <RecentTransactions />
      </div>
      <TransactionsTableView />
    </div>
  );
}
