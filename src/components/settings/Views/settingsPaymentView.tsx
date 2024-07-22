import AppointmentTabs from "@/components/appointments/appointmentTabs";
import React, { useState } from "react";
import PaymentMethonView from "./PaymentViews/paymentMethonView";
import WalletView from "./PaymentViews/walletView";
import PricingView from "./PaymentViews/pricingView";

const tabs = [
  {
    name: "Payment methods",
    count: 0,
  },
  {
    name: "Wallet",
    count: 0,
  },
  {
    name: "Pricing",
    count: 0,
  },
];

const SettingsPaymentView = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  const PaymentView = {
    "Payment methods": <PaymentMethonView />,
    Wallet: <WalletView />,
    Pricing: <PricingView />,
  }[selectedTab];

  return (
    <main className="flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 overflow-y-scroll p-8">
      <div className="flex w-[770px] flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Payments</h2>
          <p className="leading-4 text-gray-500">
            Monitor your payment transactions efficiently.
          </p>
        </header>
        <hr />

        <div className="w-fit rounded-full bg-gray-100">
          <AppointmentTabs
            counts={[0, 0, 0]}
            tabs={tabs}
            float={false}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>

        {PaymentView}
      </div>
    </main>
  );
};

export default SettingsPaymentView;
