"use client";
import Button from "@/components/misc/button";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { IPaymentResponse } from "@/types";
import { cn } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPaymentDialog = ({
  onClose,
  paymentInfo,
  requestInfo,
}: {
  onClose: () => void;
  paymentInfo: IPaymentResponse;
  requestInfo: { slotId: string; reason: string; notes: string };
}) => {
  const router = useRouter();
  const id = useParams<{ id: string }>().id;
  const { verify } = useZomujoApi(false).shared.payments;
  const { postAppointmentRequest } = useZomujoApi(false).patients;
  const [isVerifying, setIsVerifying] = useState(false);
  const [refetch, setRefetch] = useState<number | false>(200);

  const { mutate } = useMutation({
    mutationKey: ["patient", "bookAppointment"],
    mutationFn: postAppointmentRequest,
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: verifiyData,
    isError,
    status,
  } = useQuery({
    enabled: !!(isVerifying && id && refetch),
    queryKey: ["patients", "verify", paymentInfo?.reference],
    queryFn: () =>
      verify({
        doctorId: id,
        reference: paymentInfo?.reference,
      }),
    refetchInterval: refetch,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (verifiyData) {
      if (verifiyData.status) {
        setRefetch(false);
        mutate(requestInfo);
      }
    }
    if (isError) {
      setIsVerifying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifiyData]);

  useEffect(() => {
    if (status === "error") {
      setIsVerifying(true);
    }
  }, [status]);

  return (
    <div className="relative flex w-[388px] flex-col items-center gap-12 rounded-3xl bg-white p-8 shadow-xl">
      <div className="flex flex-col items-center gap-4">
        {verifiyData === undefined ? (
          <>
            <p className="text-2xl font-bold leading-6">
              {isVerifying ? "Verifying" : "Payment Initialized"}
            </p>
            {isVerifying ? (
              <div className="flex h-14 w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <p className="text-center leading-4 text-gray-500">
                Click the pay button to navigate to the payment gateway
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl font-bold leading-6">Payment Successfull</p>
            <div
              className={cn(
                "flex h-24 w-24 items-center justify-center rounded-full",

                "bg-primaryLight",
              )}
            >
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b",

                  "from-primaryLightBase to-primaryDark",
                )}
              >
                <Check size={32} strokeWidth={3} className="text-white" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex w-full flex-col gap-4">
        {verifiyData === undefined ? (
          <>
            {!isVerifying && (
              <a
                href={paymentInfo?.authorization_url}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsVerifying(true)}
              >
                <Button
                  onClick={() => setIsVerifying(true)}
                  variant="primary"
                  className="w-full"
                >
                  Pay
                </Button>
              </a>
            )}
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-transparent bg-gray-50 hover:bg-gray-100"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                router.push("/");
                onClose();
              }}
              variant="outline"
              className="w-full border-transparent bg-gray-50 hover:bg-gray-100"
            >
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPaymentDialog;
