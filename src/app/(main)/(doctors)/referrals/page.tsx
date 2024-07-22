import AnnouncementsPopover from "@/components/home/announcementsPopover";
import Profiles from "@/components/referrals/Profiles";
import ReferralSideCard from "@/components/referrals/referralsSideCard";
import { Button } from "@/components/ui/button";

export default function Referrals() {
  return (
    <div className="h-[calc(100vh-32px)] w-full rounded-2xl border border-gray-100 bg-gray-50">
      <header className="flex flex-col gap-3 border-gray-200 px-6 pb-4 pt-6">
        <div className="flex w-full flex-row items-center justify-between">
          <Button className="rounded-full bg-gray-100 text-black hover:bg-gray-200">
            Go Back
          </Button>
          <div className="flex flex-row items-center gap-3">
            <AnnouncementsPopover />
          </div>
        </div>
        <p className="text-2xl font-bold">Doctor referrals</p>
      </header>
      <div className="flex h-[calc(100vh-186px)] flex-row gap-9 px-6">
        <Profiles />
        <ReferralSideCard />
      </div>
    </div>
  );
}
