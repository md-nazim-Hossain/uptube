"use client";

import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";

import VideoCardActions from "./video-card-actions";
import { VideoCardSkeleton } from "../skeletons/video-card-skeleton";
import { VideoCard } from "../ui/video-card";

const ColumnViewVideoCard = ({
  currentVideoId,
}: {
  currentVideoId: string;
}) => {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getAllContentByType,
  );
  if (isLoading)
    return (
      <div className="space-y-5 w-full lg:max-w-sm">
        {Array.from({ length: 4 }, (_, i) => (
          <VideoCardSkeleton
            showAvatar={false}
            className="flex gap-5 space-y-0"
            key={i}
          />
        ))}
      </div>
    );
  const videos = data?.data?.data || [];
  const sliceVideos = videos?.slice(0, 8);

  return (
    <div className="w-full lg:max-w-sm space-y-5">
      {sliceVideos.map((video: IVideo, index) => {
        if (video?._id === currentVideoId) return null;
        return (
          <VideoCard key={index} className="lg:h-[90px] flex ">
            <VideoCard.Player
              thumbnail={video?.thumbnail}
              className="max-w-xs lg:max-w-[160px]"
              url={video?.videoFile}
              videoDuration={video?.duration}
              _id={video?._id}
            />
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
          </VideoCard>
        );
      })}
    </div>
  );
};

export default ColumnViewVideoCard;
