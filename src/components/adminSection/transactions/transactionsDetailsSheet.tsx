import Chip from "@/components/misc/chip";
import LoadingSpinner from "@/components/misc/loadingSpinner";
import useZomujoApi from "@/services/zomujoApi";
import { isUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { FaMobile } from "react-icons/fa";

const TransactionsDetailsSheet = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const { getTransaction } = useZomujoApi(false).admin;

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "transaction", id],
    queryFn: () => getTransaction(id),
  });

  const transactions = data?.data;

  return (
    <div className="flex h-full w-full flex-col">
      {isLoading && (
        <div className="flex h-full w-full items-center justify-between">
          <LoadingSpinner size={48} />
        </div>
      )}
      {transactions && (
        <>
          <div className="flex flex-col gap-6 px-10 pb-8 pt-12">
            <div className="h-16 w-16 rounded-full bg-gray-600">
              <Image
                className="h-full w-full rounded-full"
                src={isUrl(transactions.patient.profilePicture)}
                width={64}
                height={64}
                alt="profile"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-3xl font-bold leading-8">
                {transactions.patient.firstName} {transactions.patient.lastName}
              </p>
              <Chip
                text={transactions.type === "payment" ? "Patient" : "Doctor"}
                varient="yellow"
              />
            </div>
          </div>
          <div className="mb-8 flex h-10 w-full flex-row items-center justify-start gap-3 border-b border-gray-200 px-10">
            <div className="flex h-full w-fit items-center justify-center border-b border-primary px-1">
              <p className="text-base font-medium text-primary">Overview</p>
            </div>
            <Chip text={transactions.type} varient="yellow" />
          </div>
          <div className="flex flex-col gap-8 px-10 text-base">
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-gray-500">Transaction ID</p>
              <p className="text-xs font-medium">{transactions.id}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-gray-500">Paystack RefD</p>
              <p className="font-medium">{transactions.reference}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-gray-500">Status</p>
              <Chip text={transactions.status} varient="green" />
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-gray-500">From</p>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full bg-gray-600">
                  <Image
                    className="h-full w-full rounded-full"
                    src={isUrl(
                      transactions.type === "payment"
                        ? transactions.patient.profilePicture
                        : transactions.doctor.profilePicture,
                    )}
                    width={28}
                    height={28}
                    alt="profile"
                  />
                </div>

                <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {transactions.type === "payment"
                    ? `${transactions.patient.firstName} ${transactions.patient.lastName}`
                    : `${transactions.doctor.firstName} ${transactions.doctor.lastName}`}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-gray-500">To</p>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">
                  <Image
                    className="h-full w-full rounded-full"
                    src={isUrl(
                      transactions.type === "payment"
                        ? transactions.doctor.profilePicture
                        : transactions.patient.profilePicture,
                    )}
                    width={28}
                    height={28}
                    alt="profile"
                  />
                </div>

                <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">
                  Dr.
                  {transactions.type === "payment"
                    ? `${transactions.doctor.firstName} ${transactions.doctor.lastName}`
                    : `${transactions.doctor.firstName} ${transactions.doctor.lastName}`}
                </span>
              </div>
            </div>
            {transactions.type === "payment" && (
              <div className="flex flex-row items-center justify-between">
                <p className="font-medium text-gray-500">Method</p>
                <div className="flex items-center justify-center space-x-1 px-3 py-0.5">
                  <FaMobile className="h-[18px] w-[18px]" />{" "}
                  <span>Mobile Money</span>
                </div>
              </div>
            )}
            {transactions.type === "withdrawal" && (
              <div className="flex flex-row items-center justify-between">
                <p className="font-medium text-gray-500">Withdrawal Wallet</p>
                <div className="flex items-center justify-center space-x-1 px-3 py-0.5">
                  <FaMobile className="h-[18px] w-[18px]" />{" "}
                  <span>Mobile Money</span>
                </div>
              </div>
            )}
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-gray-500">Date</p>
              <p className="font-medium">
                {format(new Date(transactions.createdAt), "MMMM dd, yyyy")}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-gray-500">Amount</p>
              <p className="font-medium">₵ {transactions.amount.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsDetailsSheet;
