import React from "react";
import SupportFeedbackTableView from "@/components/adminSection/customerSupport/supportFeedbackTableView";

export default function CustomerSupport() {
  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="">
        <p className="text-[38px] font-bold leading-[38px]">
          Support Issues and Feedbacks
        </p>
      </div>
      <SupportFeedbackTableView />
    </div>
  );
}
