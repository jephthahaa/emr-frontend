"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/misc/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center justify-center">
        <p className="text-ceruba-500 text-6xl font-bold">404</p>
        <p className="text-5xl font-semibold">Page not found</p>
        <p className="pt-4 font-medium">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <div className="flex flex-row items-center gap-12">
        <Button
          onClick={() => router.replace("/")}
          className="text-sm font-semibold text-white"
          primaryClassname="py-3 px-4"
        >
          Go back home
        </Button>
        <button className="bg-ceruba-100 shrink-0 px-4 py-3 text-sm font-semibold">
          Contact Support
        </button>
      </div>
    </main>
  );
}
