"use client";
import Button from "@/components/misc/button";
import { SERVICE_MODE, isRouteAllowed } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ServiceModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <>
      {isRouteAllowed(path, SERVICE_MODE as "PATIENT" | "DOCTOR") ? (
        children
      ) : (
        <div className="flex h-[calc(100vh-32px)] w-full flex-col items-center justify-center gap-8 rounded-2xl border border-gray-100 bg-gray-50">
          <p className="text-4xl">
            Oops this page isn&apos;t viewable by{" "}
            <span className="capitalize">{SERVICE_MODE.toLowerCase()}s</span>
          </p>
          <Link href="/">
            <Button primaryClassname="px-5">Go back to Home</Button>
          </Link>
        </div>
      )}
    </>
  );
}
