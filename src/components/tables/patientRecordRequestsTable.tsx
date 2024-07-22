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
import { IMedicalRecordRequest } from "@/types";
import { format } from "date-fns";
import Chip from "../misc/chip";
import { Button } from "../ui/button";
import { cn, isUrl } from "@/utils";
import Dialog from "../misc/dialog";
import ToggleRecordAccessDialog from "../settings/toggleRecordAccessDialog";
import Image from "next/image";

type PatientRecordRequestsTableProps = {
  data?: IMedicalRecordRequest[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const PatientRecordRequestsTable = ({
  data,
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: PatientRecordRequestsTableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-white">
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Doctor Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-20">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No Record Requests
            </TableCell>
          </TableRow>
        )}
        {data &&
          data.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell className="text-gray-500">
                {item.id.split("-")[4]}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                    <Image
                      className="h-full w-full rounded-full"
                      src={isUrl(item.doctor.profilePicture)}
                      width={28}
                      height={28}
                      alt="profile"
                    />
                  </div>

                  <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    Dr. {item.doctor?.firstName} {item.doctor?.lastName}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  text={item.approved ? "Approved" : "Not Approved"}
                  varient={item.approved ? "green" : "blood"}
                />
              </TableCell>

              <TableCell className="text-gray-500">
                {format(new Date(item.createdAt), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex flex-row gap-3">
                  <Dialog
                    dialogChild={({ onClose }) => (
                      <ToggleRecordAccessDialog
                        onClose={onClose}
                        data={{
                          id: item.id,
                          isApproved: item.approved,
                        }}
                      />
                    )}
                  >
                    <Button
                      className={cn(
                        !item.approved && "bg-primary hover:bg-primaryDark",
                      )}
                      variant={item.approved ? "destructive" : "default"}
                    >
                      {item.approved ? "Revoke Access" : "Grant Access"}
                    </Button>
                  </Dialog>
                </div>
              </TableCell>
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

export default PatientRecordRequestsTable;
