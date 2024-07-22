import LoadingSpinner from "@/components/misc/loadingSpinner";
import PatientPastAppointmentTable from "@/components/tables/patientPastAppointmentTable";
import { IAppointment } from "@/types";
import React from "react";

const PatientPastAppointmentView = ({
  data,
  isLoading,
}: {
  data?: IAppointment[];
  isLoading: boolean;
}) => {
  return (
    <section className="flex h-[calc(100vh-120px-72px)] flex-col p-6">
      <PatientPastAppointmentTable data={data} />
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <LoadingSpinner size={60} />
        </div>
      )}
    </section>
  );
};

export default PatientPastAppointmentView;
