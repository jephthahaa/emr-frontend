import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const TooltipContainter = ({
  children,
  text,
  show = true,
  asChild = false,
  render,
}: {
  children: React.ReactNode;
  text?: string;
  show?: boolean;
  asChild?: boolean;
  render?: () => React.ReactNode;
}) => {
  if (!show) {
    return <>{children}</>;
  }

  const Content = render;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent>{Content ? <Content /> : <p>{text}</p>}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipContainter;
