import ConsultationHeader from "@/components/patients/consultation/consultationHeader";
import ConsultationViews from "@/components/patients/consultation/consultationViews";

import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function PatientConsultation() {
  return (
    <>
      <ConsultationHeader />
      <ConsultationViews />
    </>
  );
}
