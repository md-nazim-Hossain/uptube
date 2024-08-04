"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ShortCardSkeletons } from "./short-card-skeleton";
import { VideoCardSkeletons } from "./video-card-skeleton";
import { TopFansSkeletons } from "./top-fans-skeleton";

function HomePageSkeleton() {
  return (
    <main className="container pt-2">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="flex-1 space-y-5 pb-5">
            <Skeleton className="w-1/4 h-6" />
            <Skeleton className="w-full h-[600px]" />
          </div>
          <VideoCardSkeletons size={8} />
        </div>
        <div className="basis-[200px] pb-5">
          <TopFansSkeletons size={6} />
        </div>
      </div>

      <div>
        <ShortCardSkeletons
          size={6}
          className="flex gap-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
        />
        <VideoCardSkeletons size={8} />
      </div>
    </main>
  );
}

export default HomePageSkeleton;
