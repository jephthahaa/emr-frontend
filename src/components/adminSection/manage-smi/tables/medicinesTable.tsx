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
import { Button } from "@/components/ui/button";
import { IMedicine, ISMIShowDialog } from "@/types";
import { Delete02Icon, Edit01Icon, EllipsisVIcon } from "@/assets/icons";
import DeleteItemDialog from "@/components/adminSection/manage-smi/dialogs/deleteItemDialog";
import Dialog from "@/components/misc/dialog";
import AddMedicineDialog from "@/components/adminSection/manage-smi/dialogs/addMedicineDialog";
import CustomDropdownMenu from "@/components/misc/customDropdownMenu";

type TableProps = {
  data?: IMedicine[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const MedicinesTable = ({
  data = [],
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: TableProps) => {
  const [showDialog, setShowDialog] = useState<ISMIShowDialog<IMedicine>>();

  return (
    <>
      <Dialog
        disableOutsideClick
        dialogChild={(props) => {
          const Dialog = {
            edit: AddMedicineDialog,
            delete: DeleteItemDialog,
          }[showDialog?.type!]!;

          return <Dialog {...props} type="medicine" item={showDialog?.data!} />;
        }}
        isOpen={showDialog !== undefined}
        setIsOpen={() => {
          setShowDialog(undefined);
        }}
      />
      <Table>
        <TableHeader className="sticky top-0 z-20 bg-white">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
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
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-gray-500">
                {item.description}
              </TableCell>
              <TableCell>
                <CustomDropdownMenu
                  options={[
                    {
                      Icon: Edit01Icon,
                      label: "Edit",
                      onClick: () => {
                        setShowDialog({
                          data: item,
                          type: "edit",
                        });
                      },
                      className: "",
                    },
                    {
                      Icon: Delete02Icon,
                      label: "Delete",
                      onClick: () => {
                        setShowDialog({
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
              </TableCell>
            </TableRow>
          ))}
          {data && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No Medicines
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
          <TableRow className="h-11">
            <TableCell colSpan={3} className="p-2 text-end">
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
export default MedicinesTable;
