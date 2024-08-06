import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="flex gap-1 flex-wrap">
      {[...Array(7)].map((_, index) => (
        <Skeleton key={index} className="w-full xs:w-[220px] h-[390px]" />
      ))}
    </div>
  );
}

export default loading;
