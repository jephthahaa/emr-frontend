import React from "react";
import Image from "next/image";
import { isUrl } from "@/utils";
import { format } from "date-fns";
import { FileIcon } from "@/assets/images";

const FileItem = () => {
  return (
    <div className="flex h-[240px] w-[250px] flex-col justify-between gap-5 rounded-2xl border border-grayscale-300 bg-white p-4 shadow-md">
      <div
        className={
          "flex flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-[#F5F5F5] p-3"
        }
      >
        <Image src={FileIcon} className={"h-[100px] w-fit"} alt={"file"} />
        <p className={"text-sm font-medium text-gray-600"}>
          Ferritin Lab request.pdf
        </p>
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <div className="h-5 w-5 rounded-full bg-gray-500">
          <Image
            className="h-full w-full rounded-full"
            src={isUrl(null)}
            width={20}
            height={20}
            alt="profile"
          />
        </div>
        <p className="text-sm font-medium">Dr. Brian Joestar</p>
        <p className="text-xs font-medium text-gray-500">
          {format(new Date(), "HH:mm aa")}
        </p>
      </div>
    </div>
  );
};
export default FileItem;
