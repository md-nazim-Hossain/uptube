import { IVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { Fragment, useEffect } from "react";
import EmptyState from "../empty-state";
import SingleVideoCard from "../videos/single-video-card";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import { useInView } from "react-intersection-observer";

type Props = {
  className?: string;
  userId: string;
};
function ChannelShorts({ className, userId }: Props) {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLoadMore<IVideo[]>(
      apiRoutes.videos.getVideoByUserId + `/${userId}?type=short`,
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) return <VideoCardSkeletons size={10} />;
  const pages = data?.pages || [];
  if (!pages || !pages.length || !pages[0]?.data?.length)
    return <EmptyState text={"No shorts found"} />;
  return (
    <>
      <div className="py-5 gap-3 md:gap-5 grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {pages.map((page, index) => {
          if (!page || !page?.data || !page?.data.length) return null;
          return (
            <Fragment key={index}>
              {page?.data?.map((short) => (
                <SingleVideoCard
                  key={short?._id}
                  {...short}
                  showAvatar={false}
                  onHoverPlay={false}
                />
              ))}
            </Fragment>
          );
        })}
        {hasNextPage && <div ref={ref}></div>}
      </div>
      {isFetchingNextPage && <VideoCardSkeletons size={10} />}
    </>
  );
}

export default ChannelShorts;
