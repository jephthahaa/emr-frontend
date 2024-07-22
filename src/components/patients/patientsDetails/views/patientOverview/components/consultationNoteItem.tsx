import { IConsultationNote } from "@/types";
import { isUrl } from "@/utils";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

const ConsultationNoteItem = ({ note }: { note: IConsultationNote }) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-grayscale-100 text-xs font-bold">
          {format(new Date(note.createdAt), "dd")}
        </div>
        <div className="relative flex w-[2px] flex-1 bg-gray-200">
          <div className="absolute bottom-0 left-0 h-9 w-[2px] translate-y-[100%] bg-gray-200"></div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-gray-300 bg-grayscale-10 p-4 shadow-md">
        <div className="flex flex-row items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-gray-500">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(note.doctor.profilePicture)}
              width={20}
              height={20}
              alt="profile"
            />
          </div>
          <p className="text-sm font-medium">
            Dr {note.doctor.firstName} {note.doctor.lastName}
          </p>
          <p className="text-xs font-medium text-gray-500">
            {format(new Date(note.createdAt), "yyyy-MM-dd HH:mm aa")}
          </p>
        </div>
        <p className="text-sm text-gray-500">{note.notes}</p>
        {/* <div className="flex flex-row gap-2.5 ">
          <div className="flex h-9 w-fit items-center justify-between gap-1.5 rounded-full border border-gray-300 px-3">
            <FileAttachmentIcon className="h-4 w-4" />
            William’s file.docx
          </div>
          <div className="flex h-9 w-fit items-center justify-between gap-1.5 rounded-full border border-gray-300 px-3">
            <FileAttachmentIcon className="h-4 w-4" />
            William’s file.docx
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ConsultationNoteItem;
