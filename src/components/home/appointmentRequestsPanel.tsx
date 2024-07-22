"use client";
import React, { useState } from "react";
import Chip from "../misc/chip";
import AppointmentRequestCard from "./appointmentRequestCard";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/utils";
import LoadingSpinner from "../misc/loadingSpinner";
import Dialog from "../misc/dialog";
import AppointmentRequestDialogs from "../appointments/appointmentRequestDialogs";
import { IAppointmentRequestShowDialog } from "@/types";

const AppointmentRequestsPanel = () => {
  const [showModal, setShowModal] = useState<IAppointmentRequestShowDialog>();
  const { getAppointmentRequests } = useZomujoApi(false).doctors.appointments;

  const { data: appointmentRequestsData, isLoading } = useQuery({
    queryKey: ["doctors", "appointmentRequests"],
    queryFn: () => getAppointmentRequests({ limit: 25 }),
  });

  const requests =
    appointmentRequestsData?.data.filter((item) => item.status === "pending") ||
    [];

  return (
    <div className="flex h-[calc(100vh-203px)] w-[315px] shrink-0 flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
      <Dialog
        isOpen={showModal !== undefined}
        setIsOpen={() => setShowModal(undefined)}
        dialogChild={({ onClose }) => (
          <AppointmentRequestDialogs data={showModal} onClose={onClose} />
        )}
      />
      <div className="flex flex-row items-center gap-2">
        <p className="text-xl font-bold">Appointment Requests</p>
        <Chip varient="yellow" text={requests.length.toString()} />
      </div>
      <hr className="border border-gray-200" />
      <div
        className={cn(
          "flex flex-col gap-4 overflow-scroll",
          requests.length === 0 && "h-full items-center justify-center",
        )}
      >
        {isLoading && (
          <div className="flex flex-1 items-center justify-center">
            <LoadingSpinner size={42} />
          </div>
        )}
        {requests.map((request) => (
          <AppointmentRequestCard
            key={request.id}
            request={request}
            setShowModal={setShowModal}
          />
        ))}
        {!isLoading && requests.length === 0 && (
          <p className="text-center text-gray-400">
            No appointment requests available
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequestsPanel;
