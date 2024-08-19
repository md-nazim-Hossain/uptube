"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import CommentsSkeleton from "./comments-skeleton";

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
      <div className="flex gap-4 justify-between items-center">
        <Skeleton className="w-1/4 h-3" />
        <div className="w-1/3 flex gap-4 items-center">
          <Skeleton className="w-1/2 h-3" />
          <Skeleton className="w-1/2 h-3" />
        </div>
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

export const PostPageSkeletons = ({ className }: { className?: string }) => {
  return (
    <div className="max-w-4xl mx-auto py-5 sm:py-10 space-y-5">
      <div className="w-full px-6 py-3 flex gap-3 rounded-2xl bg-primary/5 border border-primary/10 dark:border-primary/20">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1">
          <div className="mb-5 md:mb-10 flex items-center gap-3">
            <Skeleton className="w-40 h-3" />
            <Skeleton className="w-32 h-2" />
          </div>
          <Skeleton className="w-full h-[300px] xs:h-[400px] md:h-[500px] lg:h-[638px] rounded-2xl" />
          <div className="mt-3 flex items-center gap-10">
            <div className="flex items-center gap-1">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="w-20 h-2" />
            </div>
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>
      </div>
      <CommentsSkeleton size={5} />
    </div>
  );
};
