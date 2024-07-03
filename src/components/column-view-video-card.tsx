"use client";

import { youtubeVideos } from "@/data";
import { IAPIResponse, IVideo, IYoutubeVideo } from "@/types";
import { VideoCard } from "./ui/video-card";
import { Button } from "./ui/button";
import ShareModal from "./modals/share-modal";
import { Separator } from "./ui/separator";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { VideoCardSkeletons } from "./skeletons/video-card-skeleton";

const ColumnViewVideoCard = ({
  currentVideoId,
}: {
  currentVideoId: string;
}) => {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getAllContentByType,
  );
  if (isLoading) return <VideoCardSkeletons size={8} />;
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
            <VideoCard.Actions show={true}>
              <Button variant={"flat"}>Add to playlist</Button>
              <Button variant={"flat"}>Next to play</Button>
              <Button variant={"flat"}>Add to queue</Button>
              <ShareModal
                trigger={<Button variant={"flat"}>Share</Button>}
                user={{
                  subscriber: video?.owner?.subscribersCount || 0,
                  avatar: video?.owner?.avatar || "",
                  fullName: video?.owner?.fullName || "",
                }}
                shareLink={`/${video?.owner?.username}`}
              />

              <Separator />
              <Button variant={"flat"}>Play</Button>
            </VideoCard.Actions>
          </VideoCard>
        );
      })}
    </div>
  );
};

export default ColumnViewVideoCard;
