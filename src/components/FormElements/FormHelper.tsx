import { FormHelperType } from "@/types";
import { FormHelperTypeStyles } from "../../lib/styles";
import { cn } from "../../utils";

type FormHelperProps = React.HTMLAttributes<HTMLParagraphElement> & {
  type?: FormHelperType;
};

export const FormHelper = ({
  className,
  type = "info",
  ...props
}: FormHelperProps) => {
  return (
    <p className={cn("mt-2 text-xs", FormHelperTypeStyles[type], className)}>
      {props.children}
    </p>
  );
};
