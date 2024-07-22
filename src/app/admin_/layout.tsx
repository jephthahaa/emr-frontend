import Sidebar from "@/components/adminSection/Layout/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import ServiceModeProvider from "../(main)/serviceModeProvider";
import ActiveSessionProvider from "../(main)/activeSessionProvider";
import Header from "@/components/adminSection/Layout/header";
import { isServiceMode } from "@/constants";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSession = await auth();
  const user = authSession.getUser();

  if (!user) {
    return redirect("/login?redirect=/admin_");
  }

  if (!isServiceMode("ADMIN")) {
    return redirect("/");
  }

  return (
    <ActiveSessionProvider>
      <main className="flex h-screen w-screen flex-row overflow-clip bg-background">
        <Sidebar />
        <section className="h-screen w-[calc(100vw-264px)] space-y-8 overflow-y-scroll">
          <Header />
          <section className="min-w-[1136px] px-8 pb-6">
            <ServiceModeProvider>{children}</ServiceModeProvider>
          </section>
        </section>
      </main>
    </ActiveSessionProvider>
  );
}
