import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

export const Chip = ({ className, children }: ChipProps) => (
  <div
    className={cn(
      "text-gray-500 bg-gray-300 px-4 py-1 rounded-full",
      className,
    )}
  >
    {children}
  </div>
);
