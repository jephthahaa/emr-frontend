"use client";
import Sheet from "@/components/misc/sheet";
import { Plus } from "lucide-react";
import React from "react";
import AddPaymentMethodSheet from "../../addPaymentMethodSheet";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { CardGlyph, WalletGlyph } from "@/assets/images";

const PaymentMethonView = () => {
  const {
    shared: { getUserDetails },
  } = useZomujoApi(false);

  const { data: userDetails } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {userDetails &&
        userDetails.paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex h-[140px] w-[140px] flex-col items-start justify-between rounded-xl border border-gray-300 bg-white p-5"
          >
            <Image
              src={method.type === "bankCard" ? CardGlyph : WalletGlyph}
              className="h-10 w-10"
              alt="method-type"
            />
            <div className="flex flex-col gap-1">
              {method.type === "bankCard" ? (
                <>
                  <p className="font-bold leading-4">Card</p>
                  <p className="text-sm leading-3 text-gray-500">
                    **** **** **** {method.cardNumber.slice(12, 17)}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold leading-4">
                    {method.mobileMoneyName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {method.mobileMoneyNumber}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      <Sheet
        sheetChild={({ onClose }) => (
          <AddPaymentMethodSheet onClose={onClose} />
        )}
      >
        <button className="flex h-[140px] w-[140px] items-center justify-center rounded-xl border border-dashed border-gray-200">
          <Plus className="h-6 w-6" />
        </button>
      </Sheet>
    </div>
  );
};

export default PaymentMethonView;
