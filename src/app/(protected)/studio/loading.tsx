import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="studio-container py-5">
      <Skeleton className="w-1/4 h-6" />
      <div className="py-5">
        <DataTableSkeleton size={5} />
      </div>
    </div>
  );
}

export default loading;
