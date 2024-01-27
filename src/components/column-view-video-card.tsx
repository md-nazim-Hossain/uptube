"use client";

import { youtubeVideos } from "@/data";
import { IYoutubeVideo } from "@/types";
import { VideoCard } from "./ui/video-card";

const ColumnViewVideoCard = () => {
  return (
    <div className="w-full lg:max-w-sm space-y-5">
      {youtubeVideos.map((url: IYoutubeVideo) => (
        <VideoCard key={url.songName} className="lg:h-[90px] flex ">
          <VideoCard.Player
            className="max-w-xs lg:max-w-[160px]"
            url={url?.url}
          />
          <VideoCard.Footer className="py-0 flex-col gap-0.5 justify-start ml-3">
            <VideoCard.Link className="text-sm" href="/watch?v=">
              {url?.songName}
            </VideoCard.Link>
            <VideoCard.VerifiedBadge channelName="Shadcn">
              Verified
            </VideoCard.VerifiedBadge>
            <VideoCard.Details views={1000} />
          </VideoCard.Footer>
          <VideoCard.Actions />
        </VideoCard>
      ))}
    </div>
  );
};

export default ColumnViewVideoCard;
