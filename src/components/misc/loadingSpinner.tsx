"use client";
import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingSpinner = ({ size = 32, stroke = 4, color = "#07926F" }) => {
  return (
    <Oval
      color={color}
      height={size}
      width={size}
      strokeWidth={stroke}
      secondaryColor="brianwashere"
    />
  );
};

export default LoadingSpinner;
