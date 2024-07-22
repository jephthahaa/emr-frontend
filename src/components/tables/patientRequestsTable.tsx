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
import {
  AppointmentRequestStatus,
  IAppointmentRequestShowDialog,
  IPatientGetAppointmentRequest,
} from "@/types";
import Chip from "../misc/chip";
import {
  Door01Icon,
  EllipsisVIcon,
  EyeIcon,
  Timer02Icon,
  UnavailableIcon,
  Video01Icon,
} from "@/assets/icons";
// import Image from "next/image";
import CustomDropdownMenu from "../misc/customDropdownMenu";
import { format } from "date-fns";
import Dialog from "../misc/dialog";
import PatientAppointmentRequestDialogs from "../appointments/patientAppointmentRequestDialog";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { isUrl } from "@/utils";

type AppointmentRequestTableProps = {
  data?: IPatientGetAppointmentRequest[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const PatientRequestsAppointmentTable = ({
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
          <PatientAppointmentRequestDialogs
            data={showDialog!}
            onClose={onClose}
          />
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
            <TableHead>Doctor Name</TableHead>
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
                  {format(new Date(item.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <CustomDropdownMenu
                    options={MoreOptions(
                      item.status as AppointmentRequestStatus,
                      item.id,
                      setShowDialog,
                      {
                        GoToDoc: () =>
                          router.push(`/doctors/${item.doctor.id}`),
                      },
                    )}
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

export default PatientRequestsAppointmentTable;

const MoreOptions = (
  status: AppointmentRequestStatus,
  id: number,
  setShowDialog: React.Dispatch<
    React.SetStateAction<IAppointmentRequestShowDialog>
  >,
  funcs: {
    GoToDoc: () => void;
  },
) => {
  switch (status) {
    case "accepted":
      return [
        {
          Icon: EyeIcon,
          label: "View Doctor",
          onClick: () => {
            funcs.GoToDoc();
          },
        },
      ];
    case "pending":
      return [
        {
          Icon: Timer02Icon,
          label: "Reschedule",
          onClick: () => {
            setShowDialog({
              requestId: id,
              slotId: "",
              action: "rechedule",
            });
          },
        },
        {
          Icon: UnavailableIcon,
          label: "Cancel",
          onClick: () => {
            setShowDialog({
              requestId: id,
              slotId: "",
              action: "cancel",
            });
          },
          className: "text-error-500",
        },
      ];
    case "declined":
      return [
        {
          Icon: EyeIcon,
          label: "View Doctor",
          onClick: () => {
            funcs.GoToDoc();
          },
        },
        // {
        //   Icon: Delete02Icon,
        //   label: "Delete",
        //   onClick: () => {},
        //   className: "text-error-500",
        // },
      ];
    case "cancelled":
      return [
        {
          Icon: EyeIcon,
          label: "View Doctor",
          onClick: () => {
            funcs.GoToDoc();
          },
        },
        // {
        //   Icon: Delete02Icon,
        //   label: "Delete",
        //   onClick: () => {},
        //   className: "text-error-500",
        // },
      ];
  }
};
