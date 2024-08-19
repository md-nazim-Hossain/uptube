"use client";
import { IFollowing } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { useEffect } from "react";
import EmptyState from "../empty-state";
import Follower from "../follower";
import FollowerSkeleton from "../skeletons/follower-skeleton";
import { useInView } from "react-intersection-observer";

function ChannelFollowings() {
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useLoadMore<IFollowing[]>(apiRoutes.follows.getAllFollowingChannel);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isLoading)
    return (
      <div className="py-5 grid gap-3 md:gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(5)].map((key) => (
          <FollowerSkeleton key={key} />
        ))}
      </div>
    );
  const pages = data?.pages || [];

  if (!pages || !pages?.length || !pages[0]?.data?.length)
    return <EmptyState text={"No followers found"} />;
  return (
    <div className="py-5">
      {pages.map((page, index) => {
        if (!page || !page?.data || !page?.data?.length) return null;
        return (
          <div
            key={index}
            className="grid gap-3 md:gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          >
            {page.data.map((following: IFollowing) => (
              <Follower
                key={following._id}
                avatar={following?.channel?.avatar}
                username={following?.channel?.username}
                fullName={following?.channel?.fullName}
                isFollow={true}
                revalidateQueryKey={apiRoutes.follows.getAllFollowingChannel}
                channelId={following?.channel?._id}
              />
            ))}
          </div>
        );
      })}

      {hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
      {isFetchingNextPage && (
        <div className="grid gap-3 md:gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {[...Array(5)].map((key) => (
            <FollowerSkeleton key={key} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChannelFollowings;
