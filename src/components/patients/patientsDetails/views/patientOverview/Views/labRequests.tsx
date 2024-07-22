import React from "react";
import { format } from "date-fns";
import FileItem from "../components/fileItem";

const LabRequests = () => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-grayscale-100 text-xs font-bold">
            {format(new Date(), "dd")}
          </div>
          <div className="relative flex w-[2px] flex-1 bg-gray-200">
            <div className="absolute bottom-0 left-0 h-9 w-[2px] translate-y-[100%] bg-gray-200"></div>
          </div>
        </div>
        <FileItem />
      </div>
    </div>
  );
};

export default LabRequests;
