"use client";
import Chip from "@/components/misc/chip";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { cn, isUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

const PatientDetailsSheet = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const { getPatient, getPatientLogs } = useZomujoApi().admin;

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "doctor", id],
    queryFn: () => getPatient(id),
  });

  const { data: doctorLogs, isLoading: logsLoading } = useQuery({
    queryKey: ["admin", "patient", id, "logs"],
    queryFn: () =>
      getPatientLogs(id, {
        limit: 25,
        page: 1,
      }),
  });

  const patient = data?.data;
  const logs = doctorLogs?.data ?? [];

  return (
    <div className="flex h-full flex-col">
      {isLoading && (
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <LoadingSpinner size={48} />
        </div>
      )}
      {patient && (
        <>
          <div className="flex flex-col gap-6 px-10 pb-8 pt-12">
            <div className="h-16 w-16 rounded-full bg-gray-600">
              <Image
                className="h-full w-full rounded-full"
                src={isUrl(patient.profilePicture)}
                width={64}
                height={64}
                alt="profile"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-3xl font-bold leading-8">
                {patient.firstName} {patient.lastName}
              </p>
              <Chip text="patient" varient="red" />
            </div>
          </div>
          <div className="mb-8 flex h-10 w-full shrink-0 flex-row items-center justify-start gap-3 border-b border-gray-200 px-10">
            <div
              className={cn(
                "flex h-full w-fit items-center justify-center gap-1 px-1 duration-75",
                true && "border-b border-primary text-primary",
              )}
            >
              <p className="text-base font-medium">Recent activity</p>
            </div>
          </div>
          <div className="flex flex-col gap-10 overflow-y-scroll px-10">
            {logsLoading && (
              <div className="flex h-full w-full flex-1 items-center justify-center">
                <LoadingSpinner size={48} />
              </div>
            )}
            {logs.map((log) => (
              <div key={log.id} className="flex flex-row gap-2">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-600">
                  <Image
                    className="h-full w-full rounded-full"
                    src={isUrl(patient.profilePicture)}
                    width={40}
                    height={40}
                    alt="profile"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col">
                    <p className="font-bold">{log.type}</p>
                    <p className="text-gray-500">
                      {format(new Date(log.createdAt), "MMMM dd, yyyy hh:mm a")}
                    </p>
                  </div>
                  {log.message.length > 0 && (
                    <div className="min-h-[60px] w-full rounded-2xl bg-gray-50 p-4">
                      {log.message}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PatientDetailsSheet;
