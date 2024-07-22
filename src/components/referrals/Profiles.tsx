import React from "react";
import ReferringSpecialists from "./ReferringSpecialists";
import PopularSpecialities from "./PopularSpecialities";
import DoctorProfile from "./DoctorProfile";
import ReferralSearch from "./ReferralSearch";

function Profiles() {
  return (
    <div className="flex w-[calc(100vw-430px-264px-48px-16px-38px)] flex-col gap-8 rounded-2xl bg-white shadow-2xl shadow-[rgba(15,23,42,0.05)]">
      <div className="flex w-full flex-col gap-10 px-6 pt-6">
        <ReferringSpecialists />
        <ReferralSearch />
      </div>
      <PopularSpecialities />
      <DoctorProfile />
    </div>
  );
}

export default Profiles;
