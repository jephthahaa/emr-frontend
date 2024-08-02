import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UiDialog = ({
  children,
  isOpen,
  setIsOpen,
  dialogChild,
  disableOutsideClick = false,
}: {
  children?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: () => void;
  disableOutsideClick?: boolean;
  dialogChild: (props: { onClose: () => void }) => React.ReactNode;
}) => {
  const DialogChild = dialogChild;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogChild onClose={() => {}} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default UiDialog;
