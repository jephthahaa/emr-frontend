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
import { IAppointment } from "@/types";
import Chip from "../misc/chip";
import { Door01Icon, Video01Icon } from "@/assets/icons";
// import Image from "next/image";
import { format } from "date-fns";
import { Button } from "../ui/button";
import Image from "next/image";
import { isUrl } from "@/utils";

type AppointmentRequestTableProps = {
  data?: IAppointment[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const PatientPastAppointmentTable = ({
  data,
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: AppointmentRequestTableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-white">
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Doctor Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>StartTime</TableHead>
          <TableHead>EndTime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
                      src={isUrl(item.doctor?.profilePicture)}
                      width={28}
                      height={28}
                      alt="profile"
                    />
                  </div>

                  <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {item.doctor?.firstName} {item.doctor?.lastName}{" "}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  text={item.status}
                  varient={
                    (
                      {
                        pending: "yellow",
                        accepted: "green",
                        completed: "green",
                        declined: "red",
                        cancelled: "red",
                      } as const
                    )[item.status]
                  }
                />
              </TableCell>
              <TableCell>
                {item.type === "virtual" ? (
                  <div className="flex flex-row items-center gap-2.5">
                    <Video01Icon className="h-4 w-4" />
                    <p className="text-sm text-gray-500">Virtual</p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2.5">
                    <Door01Icon className="h-4 w-4" />
                    <p className="text-sm text-gray-500">Visit</p>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-gray-500">
                {format(
                  new Date(item.date ?? item.appointmentDate),
                  "MMM dd, yyyy",
                )}
              </TableCell>
              <TableCell className="text-gray-500">{item.startTime}</TableCell>
              <TableCell className="text-gray-500">{item.endTime}</TableCell>
              {/* <TableCell>
                <Button variant="outline">Delete</Button>
              </TableCell> */}
            </TableRow>
          ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No Appointments Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
        <TableRow>
          <TableCell colSpan={1} className="text-start"></TableCell>
          <TableCell colSpan={4} className="text-center"></TableCell>
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

export default PatientPastAppointmentTable;
