"use client";
import Chip from "@/components/misc/chip";
import { Clock01Icon, EyeIcon, PrinterIcon } from "@/assets/icons";
import ToggleButton from "@/components/misc/toggleButton";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import Dialog from "@/components/misc/dialog";
import SignatureImageUploadDialog from "@/components/patients/components/signatureImageUpload";

const PrescriptionSummary = () => {
  const [addDigitalSignature, setAddDigitalSignature] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { getPatientPrescriptions, checkSignature } =
    useZomujoApi(false).doctors.records;

  const { data: PrescriptionDataBase, isLoading } = useQuery({
    queryKey: ["consultation", "prescriptions", id],
    queryFn: () => getPatientPrescriptions(id),
    refetchInterval: (data) => {
      if (
        data.state.data?.data.length === 0 &&
        data.state.dataUpdateCount > 3
      ) {
        return 1000;
      } else {
        return false;
      }
    },
    refetchOnMount: false,
  });

  const { mutate } = useMutation({
    mutationKey: ["consultation", "doctor", "signature", addDigitalSignature],
    mutationFn: checkSignature,
    onSuccess: (data) => {
      if (!data.status && addDigitalSignature) {
        setAddDigitalSignature(false);
        setShowDialog(true);
      }
    },
  });

  const prescriptionsData = PrescriptionDataBase?.data ?? [];

  return (
    <>
      <Dialog
        dialogChild={SignatureImageUploadDialog}
        isOpen={showDialog}
        setIsOpen={() => setShowDialog(false)}
      />
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <p className="text-lg font-bold">Prescription</p>
            <Chip varient="yellow" text={`${prescriptionsData.length ?? 0}`} />
          </div>
          <div className="flex flex-row items-center gap-3">
            <p className="text-sm font-medium">Add digital Signature</p>
            <ToggleButton
              toggled={addDigitalSignature}
              setToggled={(v) => {
                setAddDigitalSignature(v);
                mutate();
              }}
            />
            <Button type="button" className="h-8" variant="outline" size="icon">
              <EyeIcon />
            </Button>
            <Button type="button" className="h-8" variant="outline" size="icon">
              <PrinterIcon className="h-4 w-4" />
            </Button>
            <Button type="button" className="h-8 gap-2.5" variant="outline">
              Send
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex min-h-[145px] flex-row gap-4">
          {isLoading && (
            <div className="flex h-[145px] w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          {PrescriptionDataBase &&
            prescriptionsData.map((prescription) => (
              <div
                key={prescription.id}
                className="flex h-[145px] w-[240px] flex-col justify-between rounded-xl bg-white p-4 shadow-xs"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold">Medicine</p>
                  <p className="fon text-sm">{prescription.medicine}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Chip varient="red" text={prescription.repeat} />
                  <div className="flex flex-row items-center gap-1.5">
                    <Clock01Icon className="h-4 w-4" strokeWidth={14} />
                    <p className="text-xs">Today</p>
                  </div>
                </div>
              </div>
            ))}
          {PrescriptionDataBase && prescriptionsData.length === 0 && (
            <div className="flex h-[145px] w-full items-center justify-center">
              <p className="text-gray-500">Empty</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrescriptionSummary;
