import LoadingSpinner from "@/components/misc/loadingSpinner";
import PatientRecordRequestsTable from "@/components/tables/patientRecordRequestsTable";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const SettingsPrivacyView = () => {
  const { getRecordsRequests } = useZomujoApi(false).patients;
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["patients", "medicalRecord", "requests", page],
    queryFn: () => getRecordsRequests({ page }),
  });

  const recordRequestData = data?.data;
  return (
    <main className="flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 overflow-y-scroll p-8">
      <div className="flex w-[1074px] flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Privacy</h2>
          <p className="leading-4 text-gray-500">
            Control access to your private medical records
          </p>
        </header>
        <hr />

        <PatientRecordRequestsTable
          data={recordRequestData}
          currentPage={page}
          onChangePage={(val) => setPage(val)}
          totalPages={Math.ceil((data?.total ?? 1) / 25)}
        />
      </div>
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <LoadingSpinner size={60} />
        </div>
      )}
    </main>
  );
};

export default SettingsPrivacyView;
