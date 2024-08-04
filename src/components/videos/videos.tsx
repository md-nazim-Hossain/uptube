"use client";
import { IAPIResponse, IVideo } from "@/types";
import React, { Fragment, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";
import SingleVideoCard from "./single-video-card";
import { useInView } from "react-intersection-observer";

type Props = {
  className?: string;
  isChannelProfile?: boolean;
  userId?: string;
  initialData?: IAPIResponse<IVideo[]>;
};
function Videos({
  className,
  isChannelProfile = false,
  userId,
  initialData,
}: Props) {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage } = useLoadMore<IVideo[]>(
    isChannelProfile
      ? apiRoutes.videos.getVideoByUserId + `/${userId}`
      : apiRoutes.videos.getAllContentByType,
    undefined,
    [initialData],
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

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
    </div>
  );
}

export default Videos;
