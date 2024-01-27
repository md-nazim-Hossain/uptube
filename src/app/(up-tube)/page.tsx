"use client";

import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import { youtubeVideos } from "@/data";
import { IYoutubeVideo } from "@/types";

export default function Home() {
  return (
    <main className="cp-5 py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {youtubeVideos.map((url: IYoutubeVideo) => (
        <VideoCard key={url.songName}>
          <VideoCard.Player url={url?.url} />
          <VideoCard.Footer>
            <div className="flex flex-1 gap-3">
              <VideoCardAvatar.Avatar
                src="https://github.com/shadcn.png"
                alt="Shadcn"
                link="/channel/shadcn"
              />
              <div className="w-full h-full">
                <VideoCard.Link href="/watch?v=">
                  {url?.songName}
                </VideoCard.Link>
                <VideoCard.VerifiedBadge channelName="Shadcn">
                  Verified
                </VideoCard.VerifiedBadge>
                <VideoCard.Details views={1000} />
              </div>
            </div>
            <VideoCard.Actions />
          </VideoCard.Footer>
        </VideoCard>
      ))}
    </main>
  );
}
