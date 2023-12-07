import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const SectionTitle = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  return (
    <p className={cn("font-bold uppercase", className)} {...props}>
      {children}
    </p>
  );
};

export default SectionTitle;
