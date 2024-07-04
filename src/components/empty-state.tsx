import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  text: string | React.ReactNode;
};
function EmptyState({ className, text }: Props) {
  return (
    <div
      className={cn(
        "w-full h-[400px] flex justify-center items-center",
        className,
      )}
    >
      <div>{text}</div>
    </div>
  );
}

export default EmptyState;
