import React from "react";
import { SERVICE_MODE, ZOMUJO_SERVICE_MODE } from "@/constants";
import DoctorsAppointmentsView from "./_appointments/doctorsView";
import PatientsAppointmentsView from "./_appointments/patientView";

export default function Appointments() {
  switch (SERVICE_MODE) {
    case ZOMUJO_SERVICE_MODE.DOCTOR:
      return <DoctorsAppointmentsView />;
    case ZOMUJO_SERVICE_MODE.PATIENT:
      return <PatientsAppointmentsView />;
    default:
      break;
  }
}
