"use client";
import Button from "@/components/misc/button";
import Dialog from "@/components/misc/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ActiveSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionExpiredParam =
    useSearchParams().get("sessionExpired") || "false";
  const session = useSession();
  const dispatch = useAppDispatch();
  const { sessionExpired } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      dispatch(action.authentication.setSessionExpired(true));
    }
  }, [session.status, dispatch]);

  useEffect(() => {
    if (sessionExpiredParam === "true") {
      dispatch(action.authentication.setSessionExpired(true));
    }
  }, [sessionExpiredParam, dispatch]);

  return (
    <>
      <Dialog
        isOpen={sessionExpired}
        disableOutsideClick
        dialogChild={() => <SessionExpiredOverlay />}
      />
      {children}
    </>
  );
}

const SessionExpiredOverlay = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="relative flex w-[510px] flex-col items-center gap-14 rounded-3xl bg-white p-8 shadow-xl">
      <div className="flex flex-col items-center gap-6">
        <p className="text-3xl font-bold leading-8">Session Expired</p>
        <p className="text-center leading-4 text-gray-500">
          Your session has expired. Please log in again to continue.
        </p>

        <div>
          <Button
            onClick={() => {
              dispatch(action.authentication.setSessionExpired(false));
              router.push(`/login?redirect=${pathname}`);
            }}
            variant="primary"
            primaryClassname="w-[200px]"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};
