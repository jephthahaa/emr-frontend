import LoadingSpinner from "@/components/misc/loadingSpinner";
import PatientRequestsAppointmentTable from "@/components/tables/patientRequestsTable";
import { IPatientGetAppointmentRequest } from "@/types";
import React from "react";

const PatientRequestAppointmentView = ({
  data,
  isLoading,
}: {
  data?: IPatientGetAppointmentRequest[];
  isLoading: boolean;
}) => {
  return (
    <section className="flex h-[calc(100vh-120px-72px)] flex-col p-6">
      <PatientRequestsAppointmentTable data={data} />
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <LoadingSpinner size={60} />
        </div>
      )}
    </section>
  );
};

export default PatientRequestAppointmentView;
