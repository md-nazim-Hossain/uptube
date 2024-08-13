"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const PostSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full h-[210px] border rounded-2xl py-3 px-6 space-y-3",
        className,
      )}
    >
      <div className="flex gap-2 items-center">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="w-32 h-2" />
        <Skeleton className="w-1/3 h-2" />
      </div>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-3/4 h-2" />
        </div>
        <Skeleton className="size-[116px] rounded-2xl" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-1/4 h-3" />
        <Skeleton className="w-1/4 h-3" />
        <Skeleton className="w-1/4 h-3" />
      </div>
    </div>
  );
};

export const PostsSkeleton = ({
  className,
  size = 4,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div
      className={cn(
        "py-5 grid gap-3 md:gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: size }, (_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};
