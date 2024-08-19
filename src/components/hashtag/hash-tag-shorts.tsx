"use client";

import { IAPIResponse, IVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { useEffect } from "react";
import EmptyState from "../empty-state";
import { Skeleton } from "../ui/skeleton";
import ReactPlayer from "react-player";
import Link from "next/link";
import { addHTTPPrefix } from "@/utils/common";
import { useInView } from "react-intersection-observer";
import { Typography } from "../ui/typography";
import { viewsFormat } from "@/utils/video";
type Props = {
  initialData?: IAPIResponse<IVideo[]>;
  hashtagname: string;
};
function HashTagShorts({ hashtagname, initialData }: Props) {
  const [loading, setLoading] = React.useState(true);
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useLoadMore<IVideo[]>(
      apiRoutes.videos.hashtag + hashtagname + "?type=short",
      undefined,
      [initialData],
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  if (isLoading || loading)
    return (
      <div className="flex gap-1 flex-wrap">
        {[...Array(7)].map((_, index) => (
          <Skeleton key={index} className="w-full xs:w-[220px] h-[390px]" />
        ))}
      </div>
    );
  const pages = data?.pages || [];
  if (!pages || !pages.length || !pages[0]?.data?.length)
    return <EmptyState text="No hashtag videos found" />;
  return (
    <>
      {pages.map((page, index) => {
        if (!page || !page?.data || !page?.data.length) return null;
        return (
          <div key={index} className="flex gap-1 flex-wrap">
            {page.data.map((video, innerIndex) => {
              return (
                <Link
                  href={`/shorts/${video._id}`}
                  key={innerIndex}
                  className="w-full xs:w-[220px] h-[390px] inline-block relative"
                >
                  <ReactPlayer
                    height={"100%"}
                    width={"100%"}
                    muted
                    url={addHTTPPrefix(video.videoFile)}
                  />
                  <Typography
                    variant={"small"}
                    className="text-white absolute bottom-2 left-2"
                  >
                    {viewsFormat(video?.views ?? 0)}{" "}
                    {video?.views > 1 ? "views" : "view"}
                  </Typography>
                </Link>
              );
            })}
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="flex gap-1 flex-wrap">
          {[...Array(7)].map((_, index) => (
            <Skeleton key={index} className="w-full xs:w-[220px] h-[390px]" />
          ))}
        </div>
      )}
      {hasNextPage && <div ref={ref}></div>}
    </>
  );
}

export default HashTagShorts;
