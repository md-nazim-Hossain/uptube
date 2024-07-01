import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  size?: number;
};
function DataTableSkeleton({ size = 5 }: Props) {
  return (
    <div className="space-y-5">
      <div className="studio-container flex justify-between items-center">
        <Skeleton className="w-1/4 h-9" />
        <Skeleton className="w-20 rounded-[100vw] px-3 py-2" />
      </div>
      <div className="border">
        <div className="h-12 border-b studio-container flex justify-between items-center gap-10">
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/4 h-6" />
        </div>

        <div>
          {Array.from({ length: size }, (_, i) => (
            <div
              key={i}
              className="h-20 border-b last:border-b-0 studio-container flex justify-between items-center gap-x-10"
            >
              <Skeleton className="w-1/4 h-12" />
              <Skeleton className="w-1/4 h-12" />
              <Skeleton className="w-1/4 h-12" />
              <Skeleton className="w-1/4 h-12" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-5 studio-container">
        <Skeleton className="w-[100px] h-6" />
        <div className="flex gap-5 items-center">
          <Skeleton className="w-[150px] h-6" />
          <Skeleton className="w-[100px] h-6" />
          <Skeleton className="w-[150px] h-6" />
        </div>
      </div>
    </div>
  );
}

export default DataTableSkeleton;
