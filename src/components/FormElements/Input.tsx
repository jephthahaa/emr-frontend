"use client";
import { forwardRef, useState } from "react";
import { Label } from ".";
import { cn } from "../../utils";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  label?: string;
  labelClassName?: string;
  error?: { message?: string };
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, label, labelClassName, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [customType, setCustomType] = useState("password");

    return (
      <>
        {label && (
          <Label htmlFor={props.id} className={cn(labelClassName)}>
            {label}
          </Label>
        )}

        <div
          className={cn(
            "flex h-10 w-full items-center overflow-clip rounded-lg border border-gray-200 text-base outline duration-150",

            isFocused
              ? "border-primary outline-[2px] outline-primaryDark"
              : "bg-gray-10 border-gray-300 outline-none",
            className,
          )}
        >
          {icon && (
            <label
              htmlFor={props.id}
              className={cn(
                "grid aspect-square h-full flex-shrink-0 cursor-pointer place-content-center self-stretch text-gray-400",
              )}
            >
              {icon}
            </label>
          )}

          <input
            {...props}
            ref={ref}
            type={props.type === "password" ? customType : props.type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "h-full w-full flex-1 border-0 bg-transparent py-3 pr-4 text-sm text-baseBlack outline-none placeholder:text-gray-400",
              props.type !== "password" ? "pr-3" : "pr-1",
              !icon && "pl-3",
            )}
          />

          {props.type === "password" && (
            <button
              type="button"
              className="pr-2 text-primary"
              onClick={() => {
                if (customType === "password") {
                  setCustomType("text");
                }
                if (customType === "text") {
                  setCustomType("password");
                }
              }}
            >
              {customType === "password" ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </>
    );
  },
);

Input.displayName = "Input";
