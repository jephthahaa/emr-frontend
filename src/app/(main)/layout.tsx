import Sidebar from "@/components/Layouts/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import ServiceModeProvider from "./serviceModeProvider";
import ActiveSessionProvider from "./activeSessionProvider";
import ActiveConsultationBanner from "@/components/patients/consultation/activeConsultationBanner";
import PendingReviewOverlay from "@/components/patientsSection/reviews/pendingReviewOverlay";
import { isServiceMode } from "@/constants";
import SocketProvider from "./socketProvider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSession = await auth();
  const user = authSession.getUser();

  if (!user) {
    return redirect("/login");
  }

  if (isServiceMode("ADMIN")) {
    return redirect("/admin_");
  }

  return (
    <ActiveSessionProvider>
      <SocketProvider>
        <main className="flex h-screen w-screen flex-row overflow-clip">
          <ActiveConsultationBanner />
          <PendingReviewOverlay />
          <Sidebar />
          <section className="h-screen w-full min-w-[1136px] overflow-y-scroll p-4 pl-0">
            <ServiceModeProvider>{children}</ServiceModeProvider>
          </section>
        </main>
      </SocketProvider>
    </ActiveSessionProvider>
  );
}
