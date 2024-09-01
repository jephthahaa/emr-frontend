import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IIssue } from "@/types";
import { isUrl } from "@/utils";
import Chip from "@/components/misc/chip";
import { format } from "date-fns";
import Image from "next/image";
import { EllipsisVIcon } from "@/assets/icons";
import Sheet from "@/components/misc/sheet";
import IssueSheet from "@/components/adminSection/customerSupport/issueSheet";

type IssuesTableProps = {
  data?: IIssue[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const IssuesTable = ({
  data = [],
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: IssuesTableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-white">
        <TableRow>
          <TableHead>Issuer name</TableHead>
          <TableHead>Doctor/Patient</TableHead>
          <TableHead>Issue</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <div className="flex flex-row items-center">
              Date <ChevronsUpDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex flex-col items-center justify-center">
              Action
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                  <Image
                    className="h-full w-full rounded-full"
                    src={isUrl(item.user.profilePicture)}
                    width={28}
                    height={28}
                    alt="profile"
                  />
                </div>

                <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {`${item.userType === "doctor" ? "Dr. " : ""}${
                    item.user.firstName
                  } ${item.user.lastName}`}
                </span>
              </div>
            </TableCell>
            <TableCell className="capitalize text-gray-500">
              {item.userType}
            </TableCell>
            <TableCell className="">
              <div className="flex flex-col">
                <p>{item.name}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </TableCell>
            <TableCell className="text-gray-500">
              <Chip
                text={item.status ?? "open"}
                varient={
                  { open: "yellow", fixed: "green" }[
                    item.status ?? "open"
                  ] as "yellow"
                }
              />
            </TableCell>

            <TableCell className="text-gray-500">
              {format(new Date(item.createdAt), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              <Sheet
                sheetChild={({ onClose }) => (
                  <IssueSheet data={item} onClose={onClose} />
                )}
              >
                <button className="flex w-full flex-col items-center justify-center">
                  <EllipsisVIcon className="h-5 w-5 rotate-90" />
                </button>
              </Sheet>
            </TableCell>
          </TableRow>
        ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No Issues Yet
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
        <TableRow className="h-11">
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
export default IssuesTable;
