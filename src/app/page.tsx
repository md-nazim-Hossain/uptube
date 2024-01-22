"use client";

import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";

export default function Home() {
  return (
    <main className="cp-5 py-5">
      <VideoCard className="w-[400px] sb">
        <VideoCard.Player url="https://www.youtube.com/watch?v=wK-yPhDsiTY" />
        <VideoCard.Footer>
          <VideoCardAvatar.Avatar
            src="https://github.com/shadcn.png"
            alt="Shadcn"
          />
          <div>
            <VideoCard.Link href="#">
              Airplanes (feat. Hayley Williams of Paramore)
            </VideoCard.Link>
            <VideoCard.VerifiedBadge channelName="Shadcn">
              Verified
            </VideoCard.VerifiedBadge>
          </div>
        </VideoCard.Footer>
      </VideoCard>
    </main>
  );
}
