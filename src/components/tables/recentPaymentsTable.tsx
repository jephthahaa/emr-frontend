import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import Chip from "../misc/chip";
import { format } from "date-fns";
import { Button } from "../ui/button";
import Image from "next/image";
import { isUrl } from "@/utils";

type RecentPaymentsTableProps = {
  data: {
    id: string;
    amount: string | number;
    name: string;
    date: string;
  }[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};
const RecentPaymentsTable = ({
  data,
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: RecentPaymentsTableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-gray-100">
        <TableRow>
          <TableHead className="w-16 ">
            <Checkbox className="border-gray-300 bg-grayscale-75" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount(GHC)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>
              <Checkbox className="border-gray-300 bg-grayscale-75" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                  <Image
                    className="h-full w-full rounded-full"
                    src={isUrl(item.id)}
                    width={40}
                    height={40}
                    alt="profile"
                  />
                </div>

                <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-gray-500">
              {format(new Date(item.date), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              <Chip
                text={["On hold", "Withdrawn"][i % 2]}
                varient={(["yellow", "green"] as const)[i % 2]}
              />
            </TableCell>
            <TableCell>200.00</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
        <TableRow>
          <TableCell colSpan={1} className="text-start"></TableCell>
          <TableCell colSpan={3} className="text-center"></TableCell>
          <TableCell colSpan={2} className="p-2 text-end">
            <div className="flex flex-row items-center justify-end">
              <Button
                onClick={() => onChangePage?.(currentPage! - 1)}
                disabled={currentPage === 1}
                className="w-16"
                variant="outline"
              >
                Prev
              </Button>
              <div className="flex w-[80px] items-center justify-center font-mono">
                {currentPage} of {totalPages}
              </div>
              <Button
                onClick={() => onChangePage?.(currentPage! + 1)}
                disabled={currentPage === totalPages}
                className="w-16"
                variant="outline"
              >
                Next
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default RecentPaymentsTable;
