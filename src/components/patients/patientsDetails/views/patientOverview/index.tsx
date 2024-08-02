"use client";
import Button from "@/components/misc/button";
import React from "react";
import PatientGeneralInfoCard from "../../patientInfoCards/patientGeneralInfoCard";
import PatientVitalsCard from "../../patientInfoCards/patientVitalsCard";
import ConditionsAndMedicationscard from "../../patientInfoCards/conditionsAndMedicationscard";
import PatientSurgicalHistoryCard from "../../patientInfoCards/patientSurgicalHistoryCard";
import ConsultationNotes from "./consultationNotes";
import { isServiceMode } from "@/constants";
import { IPatient } from "@/types";
import Dialog from "@/components/misc/dialog";
import StartConsultationDialog from "@/components/patients/consultation/startConsultationDialog";
import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { isBetweenNearestAppointment } from "@/utils";
import TooltipContainter from "@/components/misc/tooltipContainter";

const PatientOverview = ({ patient }: { patient: IPatient }) => {
  const router = useRouter();
  const consultations = useAppSelector(
    (state) => state.consultation.activeConsultationDetails,
  );

  const isBetween = isBetweenNearestAppointment(patient.nearestAppointment);

  return (
    <main className="flex h-[calc(100vh-164px)] flex-1 flex-col gap-12 overflow-scroll p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Patient Overview</p>
          {isServiceMode("DOCTOR") && (
            <>
              {consultations === undefined && (
                <TooltipContainter
                  show={!isBetween}
                  render={() => (
                    <p className="w-[200px] text-center">
                      Cannot start consultation outside of scheduled appointment
                      date and time
                    </p>
                  )}
                >
                  <Dialog dialogChild={StartConsultationDialog}>
                    <Button
                      variant="primary"
                      disabled={!isBetween}
                      className="h-10 w-fit"
                      primaryClassname="px-4"
                    >
                      Start Consultation
                    </Button>
                  </Dialog>
                </TooltipContainter>
              )}
              {consultations !== undefined && (
                <>
                  {consultations?.userId === patient.id ? (
                    <Button
                      variant="primary"
                      onClick={() =>
                        router.push(`/patients/${patient.id}/consultation`)
                      }
                      className="h-10 w-fit"
                      primaryClassname="px-4"
                    >
                      Continue Consultation
                    </Button>
                  ) : (
                    <Dialog dialogChild={StartConsultationDialog}>
                      <Button
                        variant="primary"
                        className="h-10 w-fit"
                        primaryClassname="px-4"
                      >
                        Start Consultation
                      </Button>
                    </Dialog>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            <PatientGeneralInfoCard patient={patient} />
            <PatientSurgicalHistoryCard surgeries={patient.surgeries ?? []} />
          </div>
          <div className="flex flex-col gap-4">
            <PatientVitalsCard patient={patient} />
          </div>
          <div className="flex flex-col gap-4">
            <ConditionsAndMedicationscard />
          </div>
        </div>
      </div>
      <ConsultationNotes patientId={patient.id} />
    </main>
  );
};

export default PatientOverview;
