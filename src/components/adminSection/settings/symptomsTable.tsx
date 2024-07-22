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
import { ChevronsUpDown } from "lucide-react";
import Chip from "@/components/misc/chip";
import { Video01Icon } from "@/assets/icons";
import Hotel01 from "@/assets/icons/Hotel01";
import { IAppointment } from "@/types";
import Image from "next/image";
import { isUrl } from "@/utils";
import { Button } from "@/components/ui/button";

type AppointmentTableProps = {
  data?: IAppointment[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (val: number) => void;
};

const SymptomsTable = ({
  data = [],
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: AppointmentTableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-white">
        <TableRow>
          <TableHead>Patient Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Doctor assigned</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>
            <div className="flex flex-row items-center">
              Date <ChevronsUpDown className="h-4 w-4" />
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
                    src={isUrl(item.patient.profilePicture)}
                    width={28}
                    height={28}
                    alt="profile"
                  />
                </div>

                <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {`${item.patient.firstName} ${item.patient.lastName}`}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Chip
                text={item.status}
                varient={
                  (
                    {
                      completed: "green",
                      accepted: "green",
                      pending: "yellow",
                      declined: "red",
                      cancelled: "red",
                    } as const
                  )[item.status]
                }
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                  <Image
                    className="h-full w-full rounded-full"
                    src={isUrl(item.doctor?.profilePicture)}
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
              <div className="flex flex-row items-center gap-2.5">
                {item.type === "virtual" ? (
                  <>
                    <Video01Icon className="h-4 w-4" />
                    <p className="text-sm text-gray-500">Virtual</p>
                  </>
                ) : (
                  <>
                    <Hotel01 className="h-4 w-4" />
                    <p className="text-sm text-gray-500">Visit</p>
                  </>
                )}
              </div>
            </TableCell>
            <TableCell className="text-gray-500">
              {format(new Date(item.appointmentDate), "MMM dd, yyyy")}
            </TableCell>
          </TableRow>
        ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No Appointments
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

export default SymptomsTable;
