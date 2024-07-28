"use client";

import React from "react";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { Typography, typographyVariants } from "./ui/typography";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import { IAPIResponse, IFollower } from "@/types";
import { TopFansSkeletons } from "./skeletons/top-fans-skeleton";
import FollowUnfollow from "./channel/follow-unfollow";
import cookie from "js-cookie";
import { useUserStore } from "@/zustand/useUserStore";

function TopFans() {
  const loading = useUserStore((state) => state.loading);
  const { data, isLoading } = useFetch<IAPIResponse<IFollower[]>>(
    apiRoutes.users.getAllChannelFollower,
    undefined,
    {
      queryKey: [apiRoutes.users.getAllChannelFollower, undefined],
      enabled: !!cookie.get("accessToken"),
    },
  );

  if (isLoading || loading) return <TopFansSkeletons size={6} />;

  const followers = data?.data || [];
  if (!followers.length) return null;
  return (
    <div className="space-y-5">
      <Typography variant={"h3"}>Top Fans</Typography>
      <div className="flex flex-row lg:flex-col gap-5 flex-wrap">
        {followers.map((follower, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-3"
          >
            <Link href={`/${follower?.subscriber?.username}`}>
              <UpTubeAvatarImage
                className="size-12"
                name={follower?.subscriber?.fullName}
                src={follower?.subscriber?.avatar}
                alt={`Avatar of ${follower?.subscriber?.username}`}
              />
            </Link>
            <div className="flex flex-col gap-1 items-center">
              <Link
                href={`/${follower?.subscriber?.username}`}
                className={cn(
                  typographyVariants({
                    variant: "small",
                    className: "text-xs",
                  }),
                )}
              >
                {follower?.subscriber?.fullName}
              </Link>
              <FollowUnfollow
                className="h-max text-xs px-2 py-0.5"
                isFollow={follower?.subscriber?.isSubscribed}
                revalidateQueryKey={apiRoutes.users.getAllChannelFollower}
                channelName={follower?.subscriber?.fullName}
                channelId={follower?.subscriber?._id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFans;
