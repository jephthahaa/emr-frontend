import { Info } from "lucide-react";
import React from "react";
import PrescriptionSummary from "./prescriptionSummary";
import FutureVisitsView from "./futureVisitsView";

const ConsultationReviewView = () => {
  return (
    <div className="flex h-[calc(100vh-32px-166px)] flex-1 flex-col gap-12 overflow-scroll p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-1.5">
          <p className="text-xl font-bold">Medicine Summary</p>
          <Info size={14} />
        </div>
        <PrescriptionSummary />
        <hr />
        <FutureVisitsView />
      </div>
    </div>
  );
};

export default ConsultationReviewView;
