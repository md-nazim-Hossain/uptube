"use client";

import { youtubeVideos } from "@/data";
import { IYoutubeVideo } from "@/types";
import { VideoCard } from "./ui/video-card";
import { Button } from "./ui/button";
import ShareModal from "./modals/share-modal";
import { Separator } from "./ui/separator";

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
            <VideoCard.VerifiedBadge
              fullName="Shadcn"
              channelName="@shadcn"
              isVerified
            />
            <VideoCard.Details views={1000} />
          </VideoCard.Footer>
          <VideoCard.Actions show={true}>
            <Button variant={"flat"}>Add to playlist</Button>
            <Button variant={"flat"}>Next to play</Button>
            <Button variant={"flat"}>Add to queue</Button>
            <ShareModal
              trigger={<Button variant={"flat"}>Share</Button>}
              user={{
                subscriber: 1000,
                avatar: "https://github.com/shadcn.png",
                fullName: "Shadcn",
              }}
              shareLink="/@shadcn"
            />

            <Separator />
            <Button variant={"flat"}>Play</Button>
          </VideoCard.Actions>
        </VideoCard>
      ))}
    </div>
  );
};

export default ColumnViewVideoCard;
