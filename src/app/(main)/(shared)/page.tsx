import { SERVICE_MODE, ZOMUJO_SERVICE_MODE } from "@/constants";
import DoctorsHomeView from "./_home/doctorView";
import PatientsHomeView from "./_home/patientView";

export default function Home() {
  switch (SERVICE_MODE) {
    case ZOMUJO_SERVICE_MODE.DOCTOR:
      return <DoctorsHomeView />;
    case ZOMUJO_SERVICE_MODE.PATIENT:
      return <PatientsHomeView />;
    default:
      break;
  }
}
