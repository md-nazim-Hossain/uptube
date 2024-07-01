import React from "react";
import { Skeleton } from "../ui/skeleton";

function NavbarSkeleton() {
  return (
    <Skeleton className="w-full h-14 rounded-none">
      <div className="container flex justify-between items-center h-full">
        <div className="flex gap-3 items-center">
          <Skeleton className="size-10 rounded-full bg-primary/20" />
          <Skeleton className="w-32 h-8 bg-primary/20" />
        </div>
        <Skeleton className="w-1/3 h-10 bg-primary/20" />
        <div className="flex gap-3">
          <Skeleton className="w-24 h-9 rounded-md bg-primary/20" />
          <Skeleton className="w-24 h-9 rounded-md bg-primary/20" />
        </div>
      </div>
    </Skeleton>
  );
}

export default NavbarSkeleton;
