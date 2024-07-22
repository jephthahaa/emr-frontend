import React from "react";

const Chip = ({
  varient = "red",
  text,
}: {
  varient?: "blood" | "red" | "green" | "blue" | "yellow";
  text: string;
}) => {
  const colors = {
    blood: {
      bg: "#fef2f2",
      text: "#ef4444",
    },
    red: {
      bg: "#FAEBE3",
      text: "#7D3A16",
    },
    green: {
      bg: "#E0F5F1",
      text: "#276749",
    },
    blue: {
      bg: "#E8EFF6",
      text: "#165FA3",
    },
    yellow: {
      bg: "#FFFBEB",
      text: "#B45309",
    },
  };

  return (
    <div
      style={{
        backgroundColor: colors[varient].bg,
        color: colors[varient].text,
      }}
      className="h-fit w-fit rounded-full px-2.5 py-0.5"
    >
      <p className="text-xs font-medium capitalize">{text}</p>
    </div>
  );
};

export default Chip;
