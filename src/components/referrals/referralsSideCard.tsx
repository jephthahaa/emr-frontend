"use client";
import React, { useState } from "react";
import ReferralsNav from "./ReferralsNav";
import ReferralsMain from "./ReferralsMain";

function ReferralSideCard() {
  const [isActive, setIsActive] = useState("refer_doctors");

  return (
    <div className="flex h-max w-[430px] shrink-0 flex-col gap-[29px] rounded-2xl bg-white p-6 shadow-2xl">
      <div className="flex flex-col gap-7">
        <ReferralsNav isActive={isActive} setIsActive={setIsActive} />
        <ReferralsMain isActive={isActive} />
      </div>
    </div>
  );
}

export default ReferralSideCard;
