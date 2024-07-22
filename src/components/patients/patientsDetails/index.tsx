"use client";
import React from "react";
import PatientsDetailsSidebar from "./patientInfoCards/patientsDetailsSidebar";
import PatientsDetailsViews from "./patientsDetailsViews";
import { useParams } from "next/navigation";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import PatientDetailsRecordStatusModal from "./patientDetailsRecordStatusModal";
import LoadingSpinner from "@/components/misc/loadingSpinner";

const PatientDetailsView = () => {
  const { checkRecordRequestStatus, getPatientRecord } =
    useZomujoApi(false).doctors.records;
  const { id } = useParams<{ id: string }>();

  const { data: recordStatusBase, isLoading: checkRecordLoading } = useQuery({
    queryKey: ["patients", "check-records", id ?? ""],
    queryFn: () =>
      checkRecordRequestStatus({
        patientId: id,
      }),
    refetchOnWindowFocus: false,
  });

  const recordStatus = recordStatusBase?.data;

  const {
    data: patientData,
    isLoading: patientLoading,
    isError: patientError,
  } = useQuery({
    enabled: recordStatus === "approved",
    queryKey: ["patients", "details", "full-records", id ?? ""],
    queryFn: async () => getPatientRecord(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <section className="relative flex flex-1 flex-row">
      {recordStatus !== "approved" && (
        <div className="absolute left-0 top-0 z-30 flex h-[calc(100vh-133px-32px)] w-full items-center justify-center bg-white/70 backdrop-blur-md">
          {checkRecordLoading && <LoadingSpinner size={48} stroke={4} />}
          {recordStatus && (
            <PatientDetailsRecordStatusModal recordStatus={recordStatus} />
          )}
        </div>
      )}
      {recordStatus && recordStatus === "approved" && (
        <>
          {patientError && (
            <div className="flex items-center justify-center">
              <p>There was an error fetching patient data</p>
            </div>
          )}
          {patientLoading && <LoadingSpinner size={48} stroke={4} />}
          {patientData && !patientError && (
            <>
              <PatientsDetailsSidebar />
              <PatientsDetailsViews />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default PatientDetailsView;
