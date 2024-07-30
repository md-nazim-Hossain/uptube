import { ShortCardSkeleton } from "@/components/skeletons/short-card-skeleton";
import React from "react";

function loading() {
  return (
    <div className="flex flex-col gap-5 items-center w-full pb-10">
      <ShortCardSkeleton className="max-w-[500px]" height={800} />
    </div>
  );
}

export default loading;
