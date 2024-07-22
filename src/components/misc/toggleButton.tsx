"use client";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import React from "react";

const ToggleButton = ({
  variant = "primary",
  size = 20,
  toggled,
  setToggled,
}: {
  variant?: "primary" | "secondary";
  size?: number;
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}) => {
  const variants = {
    primary: {
      bg: "bg-primaryLight",
      toggle: "bg-primary",
    },
    secondary: {
      bg: "bg-primary",
      toggle: "bg-white",
    },
  };

  return (
    <button
      type="button"
      onClick={() => {
        setToggled && setToggled(!toggled);
      }}
      style={{ width: size * 2, height: size }}
      className={cn(
        "relative rounded-full bg-primaryLight",
        variants[variant].bg,
      )}
    >
      <motion.div
        // onClick={() => setToggled && setToggled(!toggled)}
        initial={toggled ? { x: "100%" } : { x: 0 }}
        animate={toggled ? { x: "100%" } : { x: 0 }}
        style={{ width: size, height: size }}
        transition={{ duration: 0.1 }}
        className="flex items-center justify-center p-0.5"
      >
        <div
          className={cn(
            "h-full w-full rounded-full bg-primary",
            variants[variant].toggle,
          )}
        ></div>
      </motion.div>
    </button>
  );
};

export default ToggleButton;
