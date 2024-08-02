import React from "react";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import ConsultationNoteItem from "@/components/patients/patientsDetails/views/patientOverview/components/consultationNoteItem";
import { useParams } from "next/navigation";
import { isServiceMode } from "@/constants";

const AllView = ({ patientId }: { patientId: string }) => {
  const id = useParams<{ id: string }>().id ?? patientId;
  const { doctors, patients } = useZomujoApi(false);

  const { data, isLoading } = useQuery({
    queryKey: ["patients", "consultation-Notes", id],
    queryFn: () => {
      if (isServiceMode("DOCTOR")) {
        return doctors.records.getPatientConsultationNotes(id, { limit: 10 });
      }
      return patients.records.getConsultationNotes(id, { limit: 10 });
    },
  });

  return (
    <div className="flex flex-col gap-9">
      {data &&
        data.data.map((item) => (
          <ConsultationNoteItem key={item.id} note={item} />
        ))}
    </div>
  );
};
export default AllView;
