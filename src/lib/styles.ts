import {
  ButtonSizeStyle,
  ButtonVariantStyle,
  FormHelperType,
  TextSizeStyle,
  TextVariantStyle,
} from "@/types";
import { cva } from "../utils";

// Button Styles
export const buttonVariantStyles: ButtonVariantStyle = cva({
  base: "pointer-events-auto whitespace-nowrap rounded-lg border-[1.5px] border-transparent px-6 py-4 font-medium outline outline-transparent active:scale-95",
  primary: "bg-primaryGradient text-white hover:bg-primaryGradientUndo",
  secondary: "border-grayscale300 hover:bg-grayscale100 bg-white",
  tertiary: "",
  extra: "",
});

export const buttonSizeStyles: ButtonSizeStyle = cva({
  sm: "px-4 py-2",
  md: "px-6 py-4",
  lg: "px-8 py-6",
  wide: "w-full",
});

export const textStyles: TextVariantStyle = cva({
  h1: "text-6xl font-bold",
  h2: "text-3xl font-bold md:text-[42px]",
  h3: "text-2xl font-bold leading-[2.8rem] sm:text-[38px]",
  h4: "text-xl font-bold md:text-2xl",
  h5: "text-xl font-bold",
  h6: "text-lg font-bold",
  p: "text-lg",
});

export const textSizeStyles: TextSizeStyle = cva({
  smallest: "text-xs font-normal md:text-xs",
  small: "text-base font-normal md:text-base",
  "very small": "text-sm font-normal md:text-sm",
  body: "text-lg font-normal md:text-lg",
});

export const FormHelperTypeStyles: Record<FormHelperType, string> = cva({
  error: "text-red-500",
  info: "text-grayscale-500",
});
