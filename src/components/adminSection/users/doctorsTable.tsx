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
import { format } from "date-fns";
import Chip from "@/components/misc/chip";
import { EyeIcon } from "@/assets/icons";
import Sheet from "@/components/misc/sheet";
import DoctorDetailsSheet from "./doctorDetailsSheet";
import { IDoctor } from "@/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { isUrl } from "@/utils";

type DoctorsTableProps = {
  data?: IDoctor[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const DoctorsTable = ({
  data = [],
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: DoctorsTableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-white">
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Recent Consult</TableHead>

          <TableHead>Contact</TableHead>
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
            <TableCell className="text-gray-500">{item.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                  <Image
                    className="h-full w-full rounded-full"
                    src={isUrl(item.profilePicture)}
                    width={28}
                    height={28}
                    alt="profile"
                  />
                </div>

                <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                  Dr. {item.firstName} {item.lastName}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Chip
                text={item.verification_status}
                varient={
                  (
                    {
                      verified: "green",
                      unverified: "yellow",
                    } as const
                  )[item.verification_status]
                }
              />
            </TableCell>
            <TableCell className="text-gray-500">
              {item.recentConsultDate !== null
                ? format(new Date(item.recentConsultDate), "MMM dd, yyyy")
                : "N/A"}
            </TableCell>
            <TableCell className="text-gray-500">{item.contact}</TableCell>
            <TableCell>
              <Sheet
                sheetChild={({ onClose }) => (
                  <DoctorDetailsSheet onClose={onClose} id={item.id} />
                )}
              >
                <button className="flex w-full flex-col items-center justify-center">
                  <EyeIcon className="h-5 w-5" />
                </button>
              </Sheet>
            </TableCell>
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No Doctors
            </TableCell>
          </TableRow>
        )}
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

export default DoctorsTable;
