import React from "react";
import { Skeleton } from "../ui/skeleton";

function NavbarSkeleton() {
  return (
    <Skeleton className="w-full h-14 rounded-none">
      <div className="container flex justify-between items-center h-full">
        <div className="flex gap-3 items-center">
          <Skeleton className="size-10 rounded-full bg-gray-300" />
          <Skeleton className="w-32 h-8 bg-gray-300" />
        </div>
        <Skeleton className="w-1/3 h-10 bg-gray-300" />
        <div className="flex gap-3">
          <Skeleton className="w-24 h-9 rounded-md bg-gray-300" />
          <Skeleton className="w-24 h-9 rounded-md bg-gray-300" />
        </div>
      </div>
    </Skeleton>
  );
}

export default NavbarSkeleton;
