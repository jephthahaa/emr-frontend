"use client";
import { Video01Icon } from "@/assets/icons";
import Hotel01 from "@/assets/icons/Hotel01";
import Button from "@/components/misc/button";
import Dialog from "@/components/misc/dialog";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import { useAppSelector } from "@/hooks";
import useZomujoApi from "@/services/zomujoApi";
import { IGetAppointmentSlots, IPaymentResponse } from "@/types";
import { cn, isUrl } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VerifyPaymentDialog from "./verifyPaymentDialog";

const BOOKING_FEE_PERC = 0.05;

const StepThreeView = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [paymentData, setpaymentData] = useState<
    IPaymentResponse | undefined
  >();
  const {
    patients: { getDoctorDetails },
    shared: { payments },
  } = useZomujoApi(false);
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { selectedSlotId, notes, reason } = useAppSelector(
    (state) => state.appointment,
  );

  const data = queryClient.getQueryData<IGetAppointmentSlots>([
    "patient",
    "appointmentSlots",
    id,
  ]);

  const selectSlot = data?.data.find((item) => item.id === selectedSlotId);

  const { data: docData, isLoading } = useQuery({
    queryKey: ["doctor", "details", id],
    queryFn: () => getDoctorDetails(id!),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["patient", "bookAppointment", "initialize"],
    mutationFn: payments.pay,
    onSuccess: (data) => {
      const paymentInfo = data.data;
      setpaymentData(paymentInfo);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      } else {
        console.log(error);
        toast.error("An error occurred");
      }
    },
  });

  useEffect(() => {
    if (!(notes.length > 3) || !(reason.length > 3)) {
      setCurrentStep(1);
    }
    if (!selectSlot) {
      setCurrentStep(0);
    }
  }, [selectSlot, setCurrentStep, notes, reason]);

  const ConsultationFee = docData?.data.rate?.amount || 50;
  const BookingFee = BOOKING_FEE_PERC * ConsultationFee;
  const Total = ConsultationFee + BookingFee;

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl border border-gray-200 bg-white p-8">
      <p className="text-xl font-bold leading-5">Reason for Visit</p>
      <div className="relative flex w-full flex-col items-center justify-between">
        <div className="z-10 flex h-9 w-fit items-center justify-center rounded-full border border-gray-200 bg-white px-3">
          <p className="text-sm leading-3.5 text-gray-400">
            BOOKING INFORMATION
          </p>
        </div>
        <hr className="absolute left-0 top-1/2 z-0 w-full border-dashed" />
      </div>
      <div
        className={cn(
          "flex min-h-[56px] flex-row gap-3",
          isLoading && "items-center justify-center",
        )}
      >
        {isLoading && <LoadingSpinner />}
        {docData && (
          <>
            <div className="h-14 w-14 rounded-full bg-gray-400">
              <Image
                className="h-full w-full rounded-full"
                src={isUrl(docData.data.profilePicture)}
                width={56}
                height={56}
                alt="profile"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold">
                Dr. {docData.data.firstName} {docData.data.lastName}
              </p>
              <p className="text-sm font-medium text-gray-400">
                {docData.data.specializations
                  ? docData.data.specializations[0]
                  : "General Practitioner"}
              </p>
            </div>
          </>
        )}
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between">
        <p className="leading-4 text-gray-500">Date</p>
        <p className="font-medium leading-4">
          {format(
            new Date(selectSlot?.date ? selectSlot?.date : new Date()),
            "dd MMMM yyyy",
          )}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="leading-4 text-gray-500">Time</p>
        <p className="font-medium leading-4">
          {selectSlot?.startTime.slice(0, 5)} GMT
        </p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="leading-4 text-gray-500">Reason for consult</p>
        <p className="font-medium leading-4">{reason}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="leading-4 text-gray-500">Appointment</p>
        <div
          className={cn(
            "flex flex-row items-center gap-1.5 rounded-full px-4 py-2 duration-100",
            "bg-warning-50 text-warning-600",
          )}
        >
          {selectSlot?.type === "virtual" ? (
            <Video01Icon className="h-4 w-4" />
          ) : (
            <Hotel01 className="h-4 w-4" />
          )}
          <p className="text-sm capitalize">{selectSlot?.type}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-grayscale-75 p-4">
        <p className="rounded-lg text-sm font-bold leading-3.5">
          Additional Note
        </p>
        <p className="text-gray-500">
          {notes.length > 3 ? notes : "No additional notes"}
        </p>
      </div>
      <div className="relative flex w-full flex-col items-center justify-between">
        <div className="z-10 flex h-9 w-fit items-center justify-center rounded-full border border-gray-200 bg-white px-3">
          <p className="text-sm leading-3.5 text-gray-400">BILL DETAILS</p>
        </div>
        <hr className="absolute left-0 top-1/2 z-0 w-full border-dashed" />
      </div>
      {isLoading && (
        <div className="flex h-28 items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {docData && (
        <>
          <div className="flex flex-row items-center justify-between">
            <p className="leading-4 text-gray-500">Consultation Fee</p>
            <p className="font-medium leading-4">
              GHC {ConsultationFee.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="leading-4 text-gray-500">Booking Fee</p>
            <p className="font-medium leading-4">GHC {BookingFee.toFixed(2)}</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="leading-4 text-gray-500">Total</p>
            <p className="text-lg font-bold leading-5">
              GHC {Total.toFixed(2)}
            </p>
          </div>
        </>
      )}
      <div className="flex flex-row items-center justify-between">
        <Button
          type="button"
          onClick={() => setCurrentStep((p) => p - 1)}
          variant="outline"
          className="px-6"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={() => mutate({ amount: Total, currency: "GHS" })}
          isLoading={isLoading || isPending}
          variant="primary"
          className="w-fit"
          primaryClassname="px-6 min-w-[245px]"
        >
          Make Payment of Ghc{Total.toFixed(2)}
        </Button>
      </div>
      <Dialog
        isOpen={paymentData !== undefined}
        dialogChild={() => (
          <VerifyPaymentDialog
            onClose={() => {
              setpaymentData(undefined);
            }}
            paymentInfo={paymentData!}
            requestInfo={{
              slotId: selectedSlotId,
              reason,
              notes,
            }}
          />
        )}
      />
    </div>
  );
};

export default StepThreeView;
