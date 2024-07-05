"use client";
import { IAPIResponse, IFollower } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import EmptyState from "../empty-state";
import Follower from "../follower";

function ChannelFollowers() {
  const { data, isLoading } = useFetch<IAPIResponse<IFollower[]>>(
    apiRoutes.follows.getAllChannelFollower,
  );

  if (isLoading) return <div>Loading...</div>;
  const followers = data?.data || [];
  if (!followers.length) return <EmptyState text={"No followers found"} />;
  return (
    <div>
      {followers.map((follower: IFollower, index) => (
        <Follower
          key={index}
          avatar={follower?.subscriber?.avatar}
          username={follower?.subscriber?.username}
          fullName={follower?.subscriber?.fullName}
          isFollow={follower?.subscriber?.isSubscribed}
        />
      ))}
    </div>
  );
}

export default ChannelFollowers;
