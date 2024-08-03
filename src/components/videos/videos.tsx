"use client";
import { IVideo } from "@/types";
import React, { Fragment, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";
import SingleVideoCard from "./single-video-card";
import { useInView } from "react-intersection-observer";

type Props = {
  isFeed?: boolean;
  className?: string;
  isChannelProfile?: boolean;
  userId?: string;
};
function Videos({
  isFeed = false,
  className,
  isChannelProfile = false,
  userId,
}: Props) {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage } = useLoadMore<IVideo[]>(
    isChannelProfile
      ? apiRoutes.videos.getVideoByUserId + `/${userId}`
      : apiRoutes.videos.getAllContentByType,
  );

  useEffect(() => {
    if (inView && isFeed) fetchNextPage();
  }, [fetchNextPage, inView, isFeed]);

  if (isLoading) return <VideoCardSkeletons size={isChannelProfile ? 4 : 8} />;

  const videos = data?.pages ?? [];
  if (!videos.length && isChannelProfile)
    return <EmptyState text={"No videos found"} />;
  return (
    <div
      className={cn(
        "py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {isFeed && (
        <>
          {videos?.map((page, index) => {
            return (
              <Fragment key={index}>
                {page?.data?.map((video: IVideo, index: number) => (
                  <SingleVideoCard
                    showAvatar={!isChannelProfile}
                    key={index}
                    {...video}
                  />
                ))}
              </Fragment>
            );
          })}

          {hasNextPage && <div ref={ref}></div>}
        </>
      )}
      {!isFeed && (
        <>
          {(videos?.[0]?.data || [])?.map((video: IVideo, index: number) => (
            <SingleVideoCard
              showAvatar={!isChannelProfile}
              key={index}
              {...video}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Videos;
