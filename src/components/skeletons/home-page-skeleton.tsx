import React from "react";
import NavbarSkeleton from "./navbar-skeleton";
import { Skeleton } from "../ui/skeleton";
import { VideoCardSkeletons } from "./video-card-skeleton";
import { TopFansSkeletons } from "./top-fans-skeleton";

function HomePageSkeleton() {
  return (
    <div className="space-y-5">
      <NavbarSkeleton />
      <div className="container flex gap-10">
        <div className="flex-1 space-y-5">
          <div className="flex-1 space-y-5">
            <Skeleton className="w-1/4 h-6" />
            <Skeleton className="w-full h-[600px]" />
          </div>
          <div>
            <Skeleton className="w-1/4 h-6" />
            <VideoCardSkeletons className="px-0" size={8} />
          </div>
        </div>
        <div className="w-[200px]">
          <TopFansSkeletons size={6} />
        </div>
      </div>
    </div>
  );
}

export default HomePageSkeleton;
