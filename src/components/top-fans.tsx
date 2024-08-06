"use client";

import React, { Fragment } from "react";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { Typography, typographyVariants } from "./ui/typography";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { apiRoutes } from "@/utils/routes";
import { useLoadMore } from "@/utils/reactQuery";
import { IAPIResponse, IFollower } from "@/types";
import { TopFansSkeletons } from "./skeletons/top-fans-skeleton";
import FollowUnfollow from "./channel/follow-unfollow";
import { useUserStore } from "@/zustand/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

function TopFans() {
  const { loading, user } = useUserStore((state) => state);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
  } = useLoadMore<IFollower[]>(
    apiRoutes.users.getAllChannelFollower,
    undefined,
    [],
    {
      queryKey: [apiRoutes.users.getAllChannelFollower, undefined],
      enabled: !!user,
    },
  );

  if (isLoading || loading) return <TopFansSkeletons size={6} />;

  const pages = data?.pages || [];
  if (!pages || !pages.length) return null;

  return (
    <div className="space-y-5">
      <Typography variant={"h3"}>Top Fans</Typography>
      <div className="flex flex-row lg:flex-col gap-5 flex-wrap">
        {pages?.map((page: IAPIResponse<IFollower[]>, index: number) => {
          if (!page || !page?.data || !page?.data?.length) return null;
          return (
            <Fragment key={index}>
              {page?.data?.map((follower: IFollower, innderIndex: number) => (
                <div
                  key={innderIndex}
                  className="flex flex-col lg:flex-row gap-3"
                >
                  <Link href={`/${follower?.subscriber?.username}`}>
                    <UpTubeAvatarImage
                      className="size-12"
                      name={follower?.subscriber?.fullName}
                      src={follower?.subscriber?.avatar}
                      alt={`Avatar of ${follower?.subscriber?.username}`}
                    />
                  </Link>
                  <div className="flex flex-col gap-1">
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
                      className="h-max text-xs py-0.5"
                      isFollow={follower?.subscriber?.isSubscribed}
                      onSuccess={() =>
                        queryClient.invalidateQueries({
                          queryKey: [
                            apiRoutes.users.getAllChannelFollower,
                            undefined,
                          ],
                        })
                      }
                      channelName={follower?.subscriber?.fullName}
                      channelId={follower?.subscriber?._id}
                    />
                  </div>
                </div>
              ))}
            </Fragment>
          );
        })}
        <div className="flex items-center gap-2 justify-between">
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage || isFetchingPreviousPage}
              className="text-xs py-2 h-max w-full"
              variant={"outline"}
              size={"sm"}
            >
              See More
            </Button>
          )}
          {hasPreviousPage && (
            <Button
              onClick={() => fetchPreviousPage()}
              disabled={isFetchingNextPage || isFetchingPreviousPage}
              className="text-xs py-2 h-max w-full"
              variant={"outline"}
              size={"sm"}
            >
              See Less
            </Button>
          )}
        </div>
        {isFetchingNextPage && <TopFansSkeletons size={4} />}
      </div>
    </div>
  );
}

export default TopFans;
