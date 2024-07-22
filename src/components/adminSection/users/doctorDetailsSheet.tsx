"use client";
import Button from "@/components/misc/button";
import Chip from "@/components/misc/chip";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { cn, isUrl } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DoctorDetailsSheet = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("recentActivity");
  const [whichPending, setWhichPending] = useState("");

  const {
    getDoctor,
    getDoctorLogs,
    acceptDoctorVerification,
    declineDoctorVerification,
  } = useZomujoApi().admin;

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "doctor", id],
    queryFn: () => getDoctor(id),
  });

  const { data: doctorLogs, isLoading: logsLoading } = useQuery({
    queryKey: ["admin", "doctor", id, "logs"],
    queryFn: () =>
      getDoctorLogs(id, {
        limit: 25,
        page: 1,
      }),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin", "doctor", id, "accept-decline-verification"],
    mutationFn: async (status: "accept" | "decline") => {
      if (status === "accept") {
        await acceptDoctorVerification(id);
      } else {
        await declineDoctorVerification(id);
      }
    },
    onSuccess: () => {
      toast.success("Doctor verification status updated");
      queryClient.invalidateQueries({
        queryKey: ["admin", "doctor"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "doctors", "", 1, "", "", ""],
      });
      setWhichPending("");
    },
    onError: (error) => {
      setWhichPending("");
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        console.log(error);
        toast.error("An error occurred");
      }
    },
  });

  const doctor = data?.data;
  const logs = doctorLogs?.data ?? [];

  return (
    <div className="flex h-full flex-col gap-4">
      {isLoading && (
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <LoadingSpinner size={48} />
        </div>
      )}
      {doctor && (
        <>
          <div className="flex flex-col gap-6 px-10 pt-12">
            <div className="h-16 w-16 rounded-full bg-gray-600">
              <Image
                className="h-full w-full rounded-full"
                src={isUrl(doctor.profilePicture)}
                width={64}
                height={64}
                alt="profile"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-3xl font-bold leading-8">
                Dr. {doctor.firstName} {doctor.lastName}
              </p>
              <Chip text="Doctor" varient="red" />
            </div>
          </div>
          <div className="mb-8 flex h-10 w-full shrink-0 flex-row items-center justify-start gap-3 border-b border-gray-200 px-10">
            <button
              onClick={() => setSelectedTab("recentActivity")}
              className={cn(
                "flex h-full w-fit items-center justify-center gap-1 px-1 duration-75",
                selectedTab === "recentActivity" &&
                  "border-b border-primary text-primary",
              )}
            >
              <p className="text-base font-medium">Recent activity</p>
            </button>
            <button
              onClick={() => setSelectedTab("verification")}
              className={cn(
                "flex h-full w-fit items-center justify-center gap-1 px-1 duration-75",
                selectedTab === "verification" &&
                  "border-b border-primary text-primary",
              )}
            >
              <p className="text-base font-medium">Verification</p>
              <Chip
                text={doctor.verification_status}
                varient={
                  (
                    {
                      verified: "green",
                      unverified: "yellow",
                    } as const
                  )[doctor.verification_status]
                }
              />
            </button>
          </div>
          {selectedTab === "recentActivity" ? (
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
                      className="h-full w-full rounded-2xl"
                      src={isUrl(doctor.profilePicture)}
                      width={40}
                      height={40}
                      alt="profile"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col">
                      <p className="font-bold">{log.type}</p>
                      <p className="text-gray-500">
                        {format(
                          new Date(log.createdAt),
                          "MMMM dd, yyyy hh:mm a",
                        )}
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
          ) : (
            <div className="flex flex-col gap-10 px-10">
              <div className="flex flex-col gap-3.5">
                <p className="text-lg font-bold leading-[18px]">
                  ID Front and back
                </p>
                <div className="flex aspect-[3.375/2.125] h-[240px] w-full rounded-2xl border">
                  <Image
                    className="h-full w-full rounded-2xl"
                    src={isUrl(doctor.IDs?.front)}
                    width={270}
                    height={240}
                    alt="profile"
                  />
                </div>
                <div className="flex aspect-[3.375/2.125] h-[240px] w-full rounded-2xl border">
                  <Image
                    className="h-full w-full rounded-2xl"
                    src={isUrl(doctor.IDs?.back)}
                    width={270}
                    height={240}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <p className="text-lg font-bold leading-[18px]">Face Photo</p>
                <div className="flex aspect-[3.375/2.125] h-[240px] w-full rounded-2xl border">
                  <Image
                    className="h-full w-full rounded-2xl"
                    src={isUrl(doctor.IDs?.back)}
                    width={270}
                    height={240}
                    alt="profile"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setWhichPending("approve");
                    mutate("accept");
                  }}
                  isLoading={whichPending === "approve" && isPending}
                >
                  Approve
                </Button>
                <Button
                  onClick={() => {
                    setWhichPending("reject");
                    mutate("decline");
                  }}
                  isLoading={whichPending === "reject" && isPending}
                  variant="outline"
                >
                  Reject
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorDetailsSheet;
