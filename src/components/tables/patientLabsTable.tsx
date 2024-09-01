import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomDropdownMenu from "@/components/misc/customDropdownMenu";
import {
  Delete02Icon,
  Edit01Icon,
  EllipsisVIcon,
  EyeIcon,
} from "@/assets/icons";
import Button from "@/components/misc/button";
import { IPatientLab } from "@/types";
import Chip from "@/components/misc/chip";
import Image from "next/image";
import { isUrl } from "@/utils";
import { format } from "date-fns";
import Dialog from "@/components/misc/dialog";
import UploadLabImage from "@/components/patients/components/uploadLabImage";
import DeleteLabImageDialog from "@/components/patients/components/labImageDeleteDialog";
import ViewLabImageDialog from "@/components/patients/components/viewLabImageDialog";

type TableProps = {
  data?: IPatientLab[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const PatientLabsTable = ({
  data = [],
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: TableProps) => {
  const [dialogData, setDialogData] = useState<
    { data: IPatientLab; type: "view" | "delete" | "upload" } | undefined
  >();

  return (
    <>
      <Dialog
        disableOutsideClick
        dialogChild={({ onClose }) => {
          if (!dialogData) return <></>;

          return {
            view: (
              <ViewLabImageDialog lab={dialogData.data} onClose={onClose} />
            ),
            delete: (
              <DeleteLabImageDialog lab={dialogData.data} onClose={onClose} />
            ),
            upload: (
              <UploadLabImage onClose={onClose} id={dialogData?.data.id} />
            ),
          }[dialogData?.type!]!;
        }}
        isOpen={dialogData !== undefined}
        setIsOpen={() => {
          setDialogData(undefined);
        }}
      />
      <Table>
        <TableHeader className="sticky top-0 z-20 bg-white">
          <TableRow>
            <TableHead>Lab Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Consultation Date</TableHead>
            <TableHead className="w-[100px]">
              <div className="flex flex-col items-center justify-center">
                Action
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.lab}</TableCell>
              <TableCell className="text-gray-500">
                <Chip
                  text={item.status ?? "pending"}
                  varient={
                    ({ pending: "yellow", completed: "green" } as const)[
                      item.status
                    ]
                  }
                />
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
                    {`Dr. ${item.doctor.firstName} ${item.doctor.lastName}`}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-gray-500">
                {format(new Date(item.createdAt), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="">
                {item.status === "pending" ? (
                  <Dialog
                    dialogChild={({ onClose }) => (
                      <UploadLabImage onClose={onClose} id={item.id} />
                    )}
                  >
                    <Button className="w-[80px]">Upload</Button>
                  </Dialog>
                ) : (
                  <div className="flex flex-1 items-center justify-center">
                    <CustomDropdownMenu
                      options={[
                        {
                          Icon: EyeIcon,
                          label: "View Image",
                          onClick: () => {
                            setDialogData({
                              data: item,
                              type: "view",
                            });
                          },
                          className: "",
                        },
                        {
                          Icon: Edit01Icon,
                          label: "Re-upload",
                          onClick: () => {
                            setDialogData({
                              data: item,
                              type: "upload",
                            });
                          },
                          className: "",
                        },
                        {
                          Icon: Delete02Icon,
                          label: "Remove File",
                          onClick: () => {
                            setDialogData({
                              data: item,
                              type: "delete",
                            });
                          },
                          className: "text-error-500",
                        },
                      ]}
                    >
                      <EllipsisVIcon className="h-6 w-6 rotate-90" />
                    </CustomDropdownMenu>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
          {data && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Labs
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
          <TableRow className="h-11">
            <TableCell colSpan={5} className="p-2 text-end">
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
export default PatientLabsTable;
