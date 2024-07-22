"use client";
import useMouseOverCallback from "@/hooks/useMouseOverCallback";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Trigger } from "./trigger";
import { wait } from "@/utils";

const Sheet = ({
  children,
  sheetChild: SheetChild,
}: {
  children: React.ReactNode;
  sheetChild:
    | React.ReactNode
    | ((props: { onClose: () => void }) => React.ReactNode);
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const containerVariants = {
    open: {
      display: ["hidden", "hidden", "hidden", "block", "block", "block"],
      opacity: [0, 0, 0, 1, 1, 1],
      top: [1000, 0, 0, 0, 0, 0],
    },
    close: {
      display: ["block", "block", "block", "hidden"],
      opacity: [1, 1, 0, 0],
      top: [0, 0, 0, 1000],
    },
  };

  const SheetChildElement =
    typeof SheetChild === "function" ? (
      <SheetChild onClose={() => setSheetOpen(false)} />
    ) : (
      SheetChild
    );

  return (
    <>
      <Trigger onClick={() => setSheetOpen((prev) => !prev)} asChild>
        {children}
      </Trigger>
      <AnimatePresence mode="wait">
        {sheetOpen && (
          <motion.div
            initial={{
              display: "hidden",
              opacity: 0,
              top: 1000,
            }}
            variants={containerVariants}
            animate={sheetOpen ? "open" : "close"}
            exit="close"
            className="fixed left-0 top-0 z-30 flex h-screen w-screen bg-black/30 backdrop-blur-sm"
          >
            <SheetContainer
              onClose={() => setSheetOpen(false)}
              sheetOpen={sheetOpen}
            >
              {SheetChildElement}
            </SheetContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SheetContainer = ({
  children,
  onClose,
  sheetOpen,
}: {
  children: React.ReactNode;
  onClose: () => void;
  sheetOpen: boolean;
}) => {
  const [sheetContainerOpen, setSheetContainerOpen] = useState(sheetOpen);
  const sheetRef = useRef(null);

  useMouseOverCallback(sheetRef, async () => {
    setSheetContainerOpen(false);
    await wait(150);
    onClose();
  });

  const sheetVariants = {
    open: {
      x: [420 + 32, 420 + 32, 420 + 32, 0, 0, 0],
    },
    close: {
      x: [0, 420 + 32, 420 + 32, 420 + 32, 420 + 32, 420 + 32],
    },
  };

  return (
    <motion.div
      ref={sheetRef}
      variants={sheetVariants}
      animate={sheetContainerOpen ? "open" : "close"}
      // transition={{
      //   duration: 0.15,
      // }}
      className="absolute right-0 top-0 m-4 h-[calc(100vh-32px)] w-[420px] rounded-xl bg-white"
    >
      {children}
    </motion.div>
  );
};

export default Sheet;
