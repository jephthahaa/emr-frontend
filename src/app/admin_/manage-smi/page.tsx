import React from "react";
import ManageSmiTableViews from "@/components/adminSection/manage-smi/manageSmiTableViews";

export default function ManageSMI() {
  return (
    <div className="mx-auto flex w-full max-w-[1174px] flex-col gap-8">
      <div className="">
        <p className="text-[38px] font-bold leading-[38px]">Manage SMIs</p>
      </div>
      <ManageSmiTableViews />
    </div>
  );
}
