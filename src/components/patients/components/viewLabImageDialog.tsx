import React from "react";
import { IPatientLab } from "@/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ViewLabImageDialog = ({
  onClose,
  lab,
}: {
  onClose: () => void;
  lab: IPatientLab;
}) => {
  return (
    <div className="relative flex w-[510px] flex-col gap-8 rounded-xl bg-white p-5 shadow-xl">
      <div className="flex flex-col items-start gap-4">
        <p className="text-2xl font-bold leading-8">View Image</p>

        <Image
          src={lab.fileUrl}
          width={470}
          height={626}
          className="aspect-[3/4] w-full rounded-md border object-contain"
          alt={"file"}
        />
      </div>
      <div className="flex flex-col items-end gap-6">
        <div className="space-x-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className=""
          >
            Close
          </Button>
          <a
            href={lab.fileUrl}
            target="_blank"
            download={`${lab.lab}_Test-${lab.createdAt}`}
            rel="noreferrer"
          >
            <Button type="button" variant="default" className="">
              Download
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewLabImageDialog;
