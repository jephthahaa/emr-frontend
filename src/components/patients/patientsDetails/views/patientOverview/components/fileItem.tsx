import React from "react";
import Image from "next/image";
import { isUrl } from "@/utils";
import { format } from "date-fns";
import { FileIcon } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { IPatientPrescription } from "@/types";

const FileItem = ({ data }: { data: IPatientPrescription }) => {
  return (
    <div className="flex h-[240px] max-w-[250px] flex-col justify-between gap-5 rounded-2xl border border-grayscale-300 bg-white p-4 shadow-md">
      <div
        className={
          "relative flex flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-[#F5F5F5] p-3"
        }
      >
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-xl bg-[#F5F5F5] opacity-0 duration-100 hover:bg-[#F5F5F5]/90 hover:opacity-100">
          <a
            href={data.prescriptionUrl}
            target="_blank"
            download={`prescription-Dr_${data.doctor.firstName}_${data.doctor.lastName}-${data.createdAt}.pdf`}
            rel="noreferrer"
          >
            <Button type="button" variant="default" className="">
              Download
              <ArrowDown size={16} className={"ml-1.5"} />
            </Button>
          </a>
        </div>
        <Image src={FileIcon} className={"h-[80px] w-fit"} alt={"file"} />
        <p className={"text-sm font-medium text-gray-600"}>
          Ferritin Lab request.pdf
        </p>
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <div className="h-5 w-5 rounded-full bg-gray-500">
          <Image
            className="h-full w-full rounded-full"
            src={isUrl(data.doctor.profilePicture)}
            width={20}
            height={20}
            alt="profile"
          />
        </div>
        <p className="text-sm font-medium">
          Dr. {data.doctor.firstName} {data.doctor.lastName}
        </p>
        <p className="text-xs font-medium text-gray-500">
          {format(new Date(data.createdAt), "HH:mm aa")}
        </p>
      </div>
    </div>
  );
};
export default FileItem;
