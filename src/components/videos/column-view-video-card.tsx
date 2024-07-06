"use client";

import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";

import VideoCardActions from "./video-card-actions";
import { ColumnViewVideoCardSkeletons } from "../skeletons/video-card-skeleton";
import { VideoCard } from "../ui/video-card";

const ColumnViewVideoCard = ({
  currentVideoId,
}: {
  currentVideoId: string;
}) => {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getAllContentByType,
  );
  if (isLoading) return <ColumnViewVideoCardSkeletons />;
  const videos = data?.data?.data || [];
  const sliceVideos = videos?.slice(0, 8);

  return (
    <div className="w-full lg:max-w-sm space-y-5">
      {sliceVideos.map((video: IVideo, index) => {
        if (video?._id === currentVideoId) return null;
        return (
          <VideoCard
            key={index}
            className="sm:max-w-full lg:h-[90px] flex flex-col sm:flex-row gap-3"
          >
            <VideoCard.Player
              thumbnail={video?.thumbnail}
              className="sm:max-w-xs lg:max-w-[160px]"
              url={video?.videoFile}
              videoDuration={video?.duration}
              _id={video?._id}
            />
            <div className="flex-1 flex">
              <VideoCard.Footer className="py-0 flex-col gap-0.5 justify-start ml-3">
                <VideoCard.Link
                  className="text-sm"
                  href={`/watch?v=${video?._id}`}
                >
                  {video?.title}
                </VideoCard.Link>
                <VideoCard.VerifiedBadge
                  fullName={video?.owner?.fullName}
                  channelName={video?.owner?.username}
                  isVerified={video?.owner?.isVerified}
                />
                <VideoCard.Details
                  createdAt={new Date(video?.createdAt)}
                  views={video?.views}
                />
              </VideoCard.Footer>
              <VideoCardActions user={video?.owner} show />
            </div>
          </VideoCard>
        );
      })}
    </div>
  );
};

export default ColumnViewVideoCard;
