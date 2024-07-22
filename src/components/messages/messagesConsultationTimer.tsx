import { useAppSelector } from "@/hooks";
import { IGetActiveConsultation, IRecord } from "@/types";
import { returnDoubleDigits } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { addMinutes, differenceInMilliseconds } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const MessagesConsultationTimer = () => {
  const [countDown, setcountDown] = useState(0);
  const queryClient = useQueryClient();
  const activeConsultation = useAppSelector(
    (state) => state.consultation.activeConsultationDetails,
  );
  const selectedChat = useAppSelector((state) => state.messages.selectedChat);
  const consultationDetails = queryClient.getQueryData<IGetActiveConsultation>([
    "consultation",
    "active",
  ]);

  const rate = (consultationDetails?.data as IRecord)?.rate;
  const createdAt = (consultationDetails?.data as IRecord)?.createdAt;

  const expectedConsultationEnd = addMinutes(
    new Date(createdAt),
    rate?.lengthOfSession ?? 0,
  );

  useEffect(() => {
    if (activeConsultation !== undefined) {
      setcountDown(
        differenceInMilliseconds(expectedConsultationEnd, new Date()),
      );
    }
  }, [activeConsultation, expectedConsultationEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setcountDown((prev) => prev - 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  const hours = returnDoubleDigits(
    Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const minutes = returnDoubleDigits(
    Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)),
  );
  const seconds = returnDoubleDigits(
    Math.floor((countDown % (1000 * 60)) / 1000),
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {activeConsultation?.userId === selectedChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="TimerConsultation"
            className="absolute left-1/2 top-[100%] mt-2 flex -translate-x-1/2 items-center justify-center rounded-xl bg-gray-950 p-3 text-white"
          >
            <p className="text-sm leading-3.5">
              Consultation is in session:{" "}
              <span className="font-mono">{`${hours}:${minutes}:${seconds}`}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessagesConsultationTimer;
