"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IAppointmentRequest, IAppointmentRequestShowDialog } from "@/types";
import Chip from "../misc/chip";
import {
  CancelSquareIcon,
  CheckmarkSquare02Icon,
  Delete02Icon,
  EllipsisVIcon,
  EyeIcon,
  UnavailableIcon,
  Video01Icon,
} from "@/assets/icons";
import CustomDropdownMenu from "../misc/customDropdownMenu";
import Hotel01 from "@/assets/icons/Hotel01";
import { format } from "date-fns";
import Dialog from "../misc/dialog";
import AppointmentRequestDialogs from "../appointments/appointmentRequestDialogs";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { isUrl } from "@/utils";

type AppointmentRequestTableProps = {
  data?: IAppointmentRequest[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};
const AppointmentRequestTable = ({
  data,
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: AppointmentRequestTableProps) => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState<IAppointmentRequestShowDialog>();
  return (
    <>
      <Dialog
        disableOutsideClick
        dialogChild={({ onClose }) => (
          <AppointmentRequestDialogs data={showDialog!} onClose={onClose} />
        )}
        isOpen={showDialog !== undefined}
        setIsOpen={() => {
          setShowDialog(undefined);
        }}
      />
      <Table>
        <TableHeader className="sticky top-0 z-20 bg-white">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No Upcoming Appointments
              </TableCell>
            </TableRow>
          )}
          {data &&
            data.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-500">{item.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                      <Image
                        className="h-full w-full rounded-full"
                        src={isUrl(item.patient.id)}
                        width={28}
                        height={28}
                        alt="profile"
                      />
                    </div>

                    <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {item.patient.firstName} {item.patient.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    text={item.status}
                    varient={
                      (
                        {
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
                  {format(new Date(item.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <CustomDropdownMenu
                    options={MoreOptions(item, setShowDialog, {
                      goToPatient: () =>
                        router.push(`/patients/${item.patient.id}`),
                    })}
                  >
                    <EllipsisVIcon className="h-6 w-6 rotate-90" />
                  </CustomDropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
          <TableRow>
            <TableCell colSpan={1} className="text-start"></TableCell>
            <TableCell colSpan={3} className="text-center"></TableCell>
            <TableCell colSpan={2} className="text-end">
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
    </>
  );
};

const MoreOptions = (
  item: IAppointmentRequest,
  setShowDialog: React.Dispatch<
    React.SetStateAction<IAppointmentRequestShowDialog>
  >,
  funcs: {
    goToPatient: () => void;
  },
) => {
  const { slotId, id, status, date, startTime } = item;
  const now = new Date();
  const requestDateTime = new Date(`${date} ${startTime}`);

  switch (status) {
    case "accepted":
      const options = [
        {
          Icon: EyeIcon,
          label: "View",
          onClick: () => {
            if (now < requestDateTime) {
            } else {
              funcs.goToPatient();
            }
          },
        },
      ];

      if (now < requestDateTime) {
        // options.push({
        //   Icon: Timer02Icon,
        //   label: "Reschedule",
        //   onClick: () =>
        //     setShowDialog({
        //       requestId: id,
        //       slotId,
        //       action: "rechedule",
        //     }),
        // });
        options.push({
          Icon: CancelSquareIcon,
          label: "Cancel",
          onClick: () =>
            setShowDialog({
              requestId: id,
              slotId,
              action: "cancel",
            }),
        });
      }

      return options;
    case "pending":
      return [
        {
          Icon: CheckmarkSquare02Icon,
          label: "Accept",
          onClick: () =>
            setShowDialog({
              requestId: id,
              slotId,
              action: "accept",
            }),
        },
        {
          Icon: UnavailableIcon,
          label: "Decline",
          onClick: () =>
            setShowDialog({
              requestId: id,
              slotId,
              action: "decline",
            }),
          className: "text-error-500",
        },
      ];
    case "declined":
      return [
        {
          Icon: EyeIcon,
          label: "View",
          onClick: () => funcs.goToPatient(),
        },
        {
          Icon: Delete02Icon,
          label: "Delete",
          onClick: () => {},
          className: "text-error-500",
        },
      ];
    case "cancelled":
      return [
        {
          Icon: EyeIcon,
          label: "View",
          onClick: () => funcs.goToPatient(),
        },
        {
          Icon: Delete02Icon,
          label: "Delete",
          onClick: () => {},
          className: "text-error-500",
        },
      ];
  }
};

export default AppointmentRequestTable;
