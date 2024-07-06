"use client";
import { IAPIResponse, IFollowing } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import EmptyState from "../empty-state";
import Follower from "../follower";
import FollowerSkeleton from "../skeletons/follower-skeleton";

function ChannelFollowings() {
  const { data, isLoading } = useFetch<IAPIResponse<IFollowing[]>>(
    apiRoutes.follows.getAllFollowingChannel,
  );

  if (isLoading)
    return (
      <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(5)].map((key) => (
          <FollowerSkeleton key={key} />
        ))}
      </div>
    );
  const followingChannel = data?.data || [];
  if (!followingChannel.length)
    return <EmptyState text={"No followers found"} />;
  return (
    <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {followingChannel.map((follower: IFollowing, index) => (
        <Follower
          key={index}
          avatar={follower?.channel?.avatar}
          username={follower?.channel?.username}
          fullName={follower?.channel?.fullName}
          channelId={follower?.channel?._id}
          revalidateQueryKey={apiRoutes.follows.getAllFollowingChannel}
          isFollow={true}
        />
      ))}
    </div>
  );
}

export default ChannelFollowings;
