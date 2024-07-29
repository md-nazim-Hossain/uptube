import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: number;
}
export function ShortCardSkeletons({ className, size = 5 }: Props) {
  return (
    <div className={cn("pb-5", className)}>
      {Array.from({ length: size }).map((_, index) => (
        <ShortCardSkeleton key={index} />
      ))}
    </div>
  );
}

type IProps = {
  className?: string;
  height?: number;
};
export function ShortCardSkeleton({ className, height = 500 }: IProps) {
  return (
    <div className={cn("w-full max-w-[282px] space-y-3", className)}>
      <Skeleton style={{ height: `${height}px` }} className={`w-full`} />
      <div className="space-y-1">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <div className="flex gap-2 items-center">
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/4 h-4" />
        </div>
      </div>
    </div>
  );
}
