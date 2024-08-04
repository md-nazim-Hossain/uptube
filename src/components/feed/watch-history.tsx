"use client";

import EmptyState from "@/components/empty-state";
import { ColumnViewVideoCardSkeletons } from "@/components/skeletons/video-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import ColumnViewVideoCard from "@/components/videos/column-view-video-card";
import { IAPIResponse, IVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  initialData?: IAPIResponse<IVideo[]>;
};
function WatchHistory({ initialData }: Props) {
  const [loading, setLoading] = React.useState(true);
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useLoadMore<IVideo[]>(apiRoutes.users.watchHistory, undefined, [
      initialData,
    ]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  if (loading || isLoading)
    return (
      <div className="space-y-10 py-5 max-w-4xl mx-auto">
        <Skeleton className="w-[300px] h-5" />
        <ColumnViewVideoCardSkeletons />
      </div>
    );
  const watchHistoryPages = data?.pages || [];
  if (!watchHistoryPages || !watchHistoryPages.length)
    return <EmptyState text="No watch history" />;
  return (
    <div className="space-y-10 py-5 max-w-4xl mx-auto">
      <Typography variant={"h2"}>Watch history</Typography>
      <div className="space-y-5">
        {watchHistoryPages?.map((page, index: number) => {
          if (!page?.data || page?.data?.length === 0) return null;
          return (
            <Fragment key={index}>
              {page.data.map((video: IVideo, innderIndex: number) => {
                const isLast = innderIndex + 1 === page.data!.length;
                return (
                  <div
                    key={innderIndex}
                    ref={isLast && hasNextPage ? ref : null}
                  >
                    <ColumnViewVideoCard
                      isWatchedVideo
                      className="hover:bg-primary/10 p-1.5"
                      playerClassName="xs:max-w-[246px]"
                      video={video}
                      showDescriptions={false}
                    />
                  </div>
                );
              })}
            </Fragment>
          );
        })}
        {isFetchingNextPage && <ColumnViewVideoCardSkeletons />}
      </div>
    </div>
  );
}

export default WatchHistory;
