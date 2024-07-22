import React from "react";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import ConsultationNoteItem from "@/components/patients/patientsDetails/views/patientOverview/components/consultationNoteItem";
import { useParams } from "next/navigation";

const AllView = () => {
  const { id } = useParams<{ id: string }>();
  const { getPatientConsultationNotes } = useZomujoApi(false).doctors.records;

  const { data, isLoading } = useQuery({
    queryKey: ["patients", "consultation-Notes", id],
    queryFn: () => getPatientConsultationNotes(id, { limit: 10 }),
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
