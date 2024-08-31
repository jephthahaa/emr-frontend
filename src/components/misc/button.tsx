"use client";
import { cn } from "@/utils";
import React, { ComponentProps } from "react";
import { Oval } from "react-loader-spinner";

type ButtonProps = {
  variant?: "outline" | "primary";
  primaryClassname?: string;
  isLoading?: boolean;
} & ComponentProps<"button">;

const Button = ({
  variant = "primary",
  primaryClassname,
  isLoading = false,
  ...props
}: ButtonProps) => {
  if (variant === "primary") {
    return (
      <div
        className={cn(
          "group flex h-10 w-full overflow-clip rounded-lg p-[1.5px] outline disabled:opacity-80",
          "bg-gradient-to-t from-primaryLightBase to-[#96B7D2] outline-primary",
          !props.disabled &&
            "hover:from-[#064374] hover:to-[#BACFE0] hover:outline-primaryDark",
          props.disabled && "opacity-80 disabled:cursor-not-allowed",
          props.className,
        )}
      >
        <button
          {...props}
          className={cn(
            "flex flex-1 items-center justify-center rounded-[6.5px] bg-primaryLightBase text-white duration-75 group-hover:bg-primaryDark",
            props.disabled &&
              "group-hover:bg-primaryLightBase disabled:cursor-not-allowed",
            primaryClassname,
          )}
        >
          {isLoading ? (
            <Oval color="#fff" height={20} width={20} strokeWidth={3} />
          ) : (
            props.children
          )}
        </button>
      </div>
    );
  } else {
    return (
      <button
        {...props}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-[6.5px]",
          variant === "outline" && {
            "border border-gray-300 px-4 py-2 duration-100 hover:bg-gray-50":
              true,
          },
          props.className,
        )}
      >
        {isLoading ? (
          <Oval
            color="#000000"
            height={20}
            width={20}
            strokeWidth={3}
            secondaryColor="okjohsdf"
          />
        ) : (
          props.children
        )}
      </button>
    );
  }
};

export default Button;
