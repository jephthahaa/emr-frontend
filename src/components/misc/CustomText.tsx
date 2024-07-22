import { TextSize, TextVariant } from "@/types";
import { textSizeStyles, textStyles } from "@/lib/styles";
import { cn } from "@/utils";

type CustomTextProps = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: TextVariant;
  size?: TextSize;
};

const CustomText = ({
  variant = "p",
  size = "body",
  children,
  className,
  ...props
}: CustomTextProps) => {
  const Element = variant;
  return (
    <Element
      className={cn(textSizeStyles[size], textStyles[variant], className)}
      {...props}
    >
      {children}
    </Element>
  );
};

export default CustomText;
