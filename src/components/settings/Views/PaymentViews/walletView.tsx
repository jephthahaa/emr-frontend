import { BankIcon } from "@/assets/icons";
import { Input } from "@/components/FormElements";
import Button from "@/components/misc/button";
import Chip from "@/components/misc/chip";
import RecentPaymentsTable from "@/components/tables/recentPaymentsTable";
import { Plus } from "lucide-react";
import React from "react";
import { BsFilter } from "react-icons/bs";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const WalletView = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row gap-3">
        <div className="flex h-[230px] w-[450px] flex-col gap-4 rounded-xl border border-gray-300 bg-white p-5">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium uppercase leading-[14px] text-gray-400">
              available
            </p>
            <p className="text-4xl font-bold leading-9">$2,000,789.00</p>
          </div>
          <hr />
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex h-fit flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-1 text-gray-500">
                <BankIcon className="h-5 w-5" />
                <p>Jimmy Owusu</p>
              </div>
              <Chip varient="green" text="Available" />
            </div>
            <Button variant="primary">Withdraw</Button>
          </div>
        </div>
        <button className="flex h-[230px] w-[230px] items-center justify-center rounded-lg border border-dashed border-gray-300">
          <Plus className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-xl font-bold leading-5">Recent Payments</p>
        <div className="flex flex-row gap-2">
          <Input
            className="w-[330px] border-gray-200 bg-white"
            icon={<FiSearch className="h-5 w-5" />}
            placeholder="Search Patients"
          />
          <div className="bg-gray-10 flex h-9 flex-row items-center gap-1.5 rounded-md px-3 py-2">
            <BsFilter className="h-5 w-5" />
            <p className="text-sm font-medium">No Filters</p>
            <FiChevronDown />
          </div>
        </div>
        <div className="overflow-clip rounded-xl border border-gray-300 bg-white">
          <RecentPaymentsTable data={RECENT_PAYMENTS} />
        </div>
      </div>
    </div>
  );
};

const RECENT_PAYMENTS = [
  {
    name: "John Doe",
    date: "2021-08-01",
    id: "1234567890",
    amount: "100.00",
  },
  {
    name: "Jane Smith",
    date: "2021-08-02",
    id: "0987654321",
    amount: "50.00",
  },
  {
    name: "Alice Johnson",
    date: "2021-08-03",
    id: "2468135790",
    amount: "75.00",
  },
  {
    name: "Bob Wilson",
    date: "2021-08-04",
    id: "1357924680",
    amount: "200.00",
  },
  {
    name: "Emily Brown",
    date: "2021-08-05",
    id: "3141592653",
    amount: "150.00",
  },
  {
    name: "Michael Davis",
    date: "2021-08-06",
    id: "2718281828",
    amount: "125.00",
  },
  {
    name: "Sarah Thompson",
    date: "2021-08-07",
    id: "1122334455",
    amount: "80.00",
  },
  {
    name: "David Lee",
    date: "2021-08-08",
    id: "9876543210",
    amount: "95.00",
  },
  {
    name: "Olivia Clark",
    date: "2021-08-09",
    id: "5678901234",
    amount: "120.00",
  },
  {
    name: "Daniel Rodriguez",
    date: "2021-08-10",
    id: "4321098765",
    amount: "175.00",
  },
];

export default WalletView;
